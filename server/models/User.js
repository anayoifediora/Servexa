const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//Creation of userSchema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 30,
    },
    firstName: {
      type: String,
      required: [true, 'First Name required'],
      trim: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name required'],
      trim: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (value) {
          // must contain at least one number and one uppercase letter
          return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message: () => `Password must contain at least one uppercase letter and one number`,
      },
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    status: {
      type: String,
      enum: ['Pending Approval', 'Approved', 'De-listed'],
      default: 'Pending Approval',
    },
    phone: {
      type: String,
      validate: {
        validator: function (number) {
          const regex = /^04\d{8}$/;
          return regex.test(number);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    },
    address: {
      street: {
        type: String,
        required: true,
        maxLength: 30,
      },
      suburb: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
        maxLength: 20,
      },
      postCode: {
        type: String,
        required: true,
        maxLength: 10,
      },
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (names) {
    const first = names.split(' ')[0];
    const last = names.split(' ')[1];
    this.set({ first, last });
  });

//Set up pre-save middleware to hash the password before it's created
userSchema.pre('save', async function () {
  if (this.isNew || this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }
});

//Compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// Remove password from responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = model('User', userSchema);

module.exports = User;

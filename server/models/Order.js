const { Schema, model } = require('mongoose');
const User = require('../models/User');

//Creation of orderSchema

const orderSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: [
        'Pending Review',
        'Approved',
        'Rejected',
        'Payment pending',
        'In Progress',
        'Completed',
        'Closed',
      ],
      default: 'Pending Review',
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Set up a pre-save middleware to ensure a user is approved before creating orders

orderSchema.pre('save', async function (next) {
  try {
    const user = await User.findById(this.client).select('status');
    if (!user) {
      return next(new Error(`User with ID ${this.userId} not found`));
    }
    if (user.status !== 'Approved') {
      return next(new Error(`User account is not approved. Current status: ${user.status}`));
    }

    next();
  } catch (err) {
    return next(err);
  }
});
const Order = model('Order', orderSchema);

module.exports = Order;

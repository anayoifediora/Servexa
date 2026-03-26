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
        'Approved, payment pending.',
        'Rejected',
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

orderSchema.pre('save', async function () {
  
    const user = await User.findById(this.client).select('status');
    if (!user) {
      throw new Error(`User with ID ${this.client} not found`);
    }
    if (user.status !== 'Approved') {
      throw new Error(`User account is not approved. Current status: ${user.status}`);
    }

    
  
});
const Order = model('Order', orderSchema);

module.exports = Order;

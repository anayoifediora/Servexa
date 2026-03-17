const { Schema, model } = require('mongoose');

//Creation of serviceSchema

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minLength: 20,
      required: true,
    },
    defaultPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Development', 'Infrastructure', 'Consultation', 'Maintenance'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
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

const Service = model('Service', serviceSchema);

module.exports = Service;

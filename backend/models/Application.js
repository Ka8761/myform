const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: String,
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: String,
  state: {
    type: String,
    required: true
  },
  zip: String,
  country: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  employed: {
    type: String,
    required: true
  },
  employerName: String,
  employmentYears: {
    type: Number,
    required: true
  },
  income: Number,
  gotPets: String,
  felony: String,
  evicted: String,
  bankruptcy: {
    type: String,
    required: true
  },
  termsAccepted: Boolean,
  paymentMethod: String,
  creditScore: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
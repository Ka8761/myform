const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from both ends of a string
    unique: true, // Ensure usernames are unique in the database
    minlength: 3, // Optional: Minimum length for username
    maxlength: 30, // Optional: Maximum length for username
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure emails are unique
    lowercase: true, // Store email in lowercase
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed, like timestamps, roles, etc.
});

// Create the User Model from the Schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
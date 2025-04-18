// routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); // Mongoose model
const auth = require('../middleware/auth');

// Submit rental application
router.post('/apply', auth, async (req, res) => {
    try {
      const newApplication = new Application({
        userId: req.user.userId,
        ...req.body
      });
  
      await newApplication.save();
      res.status(201).json({ message: 'Application submitted successfully', applicationId: newApplication._id });
    } catch (error) {
      console.error('Application submission error:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  });

module.exports = router;

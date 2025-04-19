const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const applicationRoutes = require('./routes/application.js');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const mongoDBLink = process.env.MONGO_URL;

// Apply middleware first
app.use(cors());
app.use(express.json());

// Then define API routes
app.use('/api', authRoutes);
app.use('/api', applicationRoutes);

// Finally, set up static file serving and catch-all route for frontend
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBLink);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
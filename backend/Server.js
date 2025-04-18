const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application.js'); // Import the new routes
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const mongoDBLink = 'mongodb+srv://Project1:QYGYkxWtzVaLfK0o@cluster0.nl53ecj.mongodb.net';

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
// Apply middlewares first
app.use(cors());
app.use(express.json());

// Then use the routes
app.use('/api', authRoutes);
app.use('/api', applicationRoutes); // Add the application routes


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
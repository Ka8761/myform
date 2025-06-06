require('dotenv').config(); // Load environment variables from .env file
console.log(process.env.NODE_ENV)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const applicationRoutes = require('./routes/application.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const mongoDBLink = process.env.MONGO_URL;

// Apply middleware first
//app.use(cors());
app.use(cors({
  origin: '*', // or use the actual IP of the frontend
  credentials: true
}));
app.use(express.json());

// Then define API routes
app.use('/api', authRoutes);
app.use('/api', applicationRoutes);

// Add this to a temporary script or your server startup
const db = mongoose.connection;

// db.once('open', async () => {
//   try {
//     await db.collection('users').dropIndex('username_1');
//     console.log('Successfully dropped username index');
//   } catch (err) {
//     console.log('Error dropping index or index doesn\'t exist:', err);
//   }
// });

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
if (process.env.NODE_ENV === 'production') {
  console.log('serve build from development server');
  const buildPath = path.join(__dirname, '../frontend/build');
  console.log(buildPath);
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
// // }
// // First handle API routes

// // Then handle static files
// // Add this before your routes

  
  console.log('Development mode active');
  
  app.get('/', (req, res) => {
    res.send('Development server is running');
  });
  
  app.get('*', (req, res) => {
    res.status(404).send('Route not found in development mode');
  });


app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

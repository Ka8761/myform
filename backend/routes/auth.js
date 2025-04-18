const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2. Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this username or email already exists.' });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create and save the new user to the DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // 💾 This line saves it in MongoDB
    const users = await User.find();
    console.log(users);
    
    // 5. Send back a token and success message
    const token = jwt.sign({ userId: newUser._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed on the server.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' }); // Replace 'YOUR_SECRET_KEY'

    res.status(200).json({ message: 'Login successful!', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
});



module.exports = router;
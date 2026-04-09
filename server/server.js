require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Comment = require('./models/Comment');

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/comments', require('./routes/comments'));

// Seed initial approved comments
async function seedComments() {
  const existing = await Comment.findOne({ status: 'approved' });
  if (!existing) {
    await Comment.insertMany([
      {
        name: 'Amara Nkusi',
        role: 'Classmate · Rwanda Coding Academy',
        message: 'Lys has an incredible eye for design and a deep understanding of code. Working with her on projects always pushed the quality bar higher. She thinks like both an engineer and an artist.',
        status: 'approved'
      },
      {
        name: 'Jean-Paul Habimana',
        role: 'Teammate · RCA Software Project',
        message: 'What sets Lys apart is her attention to detail and her ability to communicate complex ideas clearly — in both English and French. She is exactly the kind of developer you want on your team.',
        status: 'approved'
      }
    ]);
    console.log('✓ Seeded initial testimonials');
  }
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    await seedComments();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });

// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const complaintRoutes = require('./routes/complaintRoutes');
const kiteRoutes = require('./routes/kiteRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const aadhaarRoutes = require('./routes/aadhaarRoutes');
const pensionRoutes = require('./routes/pensionRoutes');
const voterRoutes = require('./routes/voterRoutes'); // ✅ must match filename

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/kites', kiteRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/aadhaar', aadhaarRoutes);
app.use('/api/pension', pensionRoutes);
app.use('/api/voterid', voterRoutes);
app.get('/', (req, res) => {
  res.send('✅ MCD Portal Backend is running...');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

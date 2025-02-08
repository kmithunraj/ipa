require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const seedDatabase = require('./seed/seed');
const studentRoutes = require('./routes/student');
const sectionRoutes = require('./routes/section');
const examRoutes = require('./routes/exam');
const { errorHandler } = require('./middleware/error');
const { sequelize } = require('./config/db');

const app = express();

// Initialize database and start server
const init = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Sync database with alter true
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Seed database
    await seedDatabase();

    // Middleware
    app.use(cors({
      credentials: true,
      origin: process.env.CLIENT_URL || 'http://localhost:3000'
    }));
    app.use(express.json());
    app.use(cookieParser());

    // Routes
    app.use('/api/student', studentRoutes);
    app.use('/api/section', sectionRoutes);
    app.use('/api/exam', examRoutes);

    // Error handling
    app.use(errorHandler);

    // Start server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

init();
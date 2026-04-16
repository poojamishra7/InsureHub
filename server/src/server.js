const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const policiesRoutes = require('./routes/policies');
const quotesRoutes = require('./routes/quotes');
const purchasesRoutes = require('./routes/purchases');
const claimsRoutes = require('./routes/claims');
const customersRoutes = require('./routes/customers');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/insurehub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => logger.info('MongoDB connected successfully')).catch(err => logger.error('MongoDB connection error:', err));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/customers', customersRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        logger.info('Server closed');
        mongoose.connection.close();
    });
});

module.exports = app;
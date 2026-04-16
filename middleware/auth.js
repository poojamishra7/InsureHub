const jwt = require('jsonwebtoken');

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        req.user = decoded; // Save decoded token to request for future use
        next();
    });
}

// Middleware to check if user is Admin
function checkAdmin(req, res, next) {
    if (req.user.role && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).send('Access denied. Admins only.');
    }
}

// Middleware to check if user is Customer
function checkCustomer(req, res, next) {
    if (req.user.role && req.user.role === 'customer') {
        next();
    } else {
        return res.status(403).send('Access denied. Customers only.');
    }
}

// Middleware to check if user is Admin or Agent
function checkAdminOrAgent(req, res, next) {
    if (req.user.role && (req.user.role === 'admin' || req.user.role === 'agent')) {
        next();
    } else {
        return res.status(403).send('Access denied. Admins or Agents only.');
    }
}

module.exports = { verifyToken, checkAdmin, checkCustomer, checkAdminOrAgent };

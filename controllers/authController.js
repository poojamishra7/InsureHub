const Joi = require('joi');
const jwt = require('jsonwebtoken');

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const users = {}; // Placeholder for user storage

const authController = {

    register: (req, res) => {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const { username, password } = req.body;
        // Save user logic here (hash password, etc.)
        users[username] = { password };  // In memory for example purposes
        res.send('User registered');
    },

    login: (req, res) => {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const { username, password } = req.body;
        const user = users[username];
        if (!user || user.password !== password) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    },

    logout: (req, res) => {
        // Handle logout logic, e.g., invalidate the token or session
        res.send('Logged out');
    },

    refreshToken: (req, res) => {
        const token = req.body.token;
        if (!token) return res.sendStatus(401);
        
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) return res.sendStatus(403);
            const newToken = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
            res.json({ token: newToken });
        });
    },

    verifyToken: (req, res) => {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(401);
        
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) return res.sendStatus(403);
            res.json({ user });
        });
    },
};

module.exports = authController;

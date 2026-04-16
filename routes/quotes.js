'use strict';

const express = require('express');
const router = express.Router();

// Middleware to simulate database
const quotes = [];

// Generate a new quote
router.post('/quotes/generate', (req, res) => {
    const { name, coverageAmount } = req.body;
    if (!name || !coverageAmount) {
        return res.status(400).send({ message: 'Name and coverage amount are required.' });
    }
    const quote = {
        id: quotes.length + 1,
        name,
        coverageAmount,
        createdAt: new Date().toISOString()
    };
    quotes.push(quote);
    return res.status(201).send(quote);
});

// Get all quotes
router.get('/quotes', (req, res) => {
    return res.send(quotes);
});

// Get a specific quote by ID
router.get('/quotes/:id', (req, res) => {
    const { id } = req.params;
    const quote = quotes.find(q => q.id === parseInt(id));
    if (!quote) {
        return res.status(404).send({ message: 'Quote not found.' });
    }
    return res.send(quote);
});

// Delete a specific quote by ID
router.delete('/quotes/:id', (req, res) => {
    const { id } = req.params;
    const index = quotes.findIndex(q => q.id === parseInt(id));
    if (index === -1) {
        return res.status(404).send({ message: 'Quote not found.' });
    }
    quotes.splice(index, 1);
    return res.status(204).send();
});

module.exports = router;

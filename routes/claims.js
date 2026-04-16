'use strict';

const express = require('express');
const router = express.Router();

// Placeholder for insurance claims
let claims = [];

// Endpoint to submit a new claim
router.post('/claims', (req, res) => {
    const claim = req.body;
    claim.id = claims.length + 1; // Simple ID assignment
    claims.push(claim);
    res.status(201).json(claim);
});

// Endpoint to get all claims
router.get('/claims', (req, res) => {
    res.json(claims);
});

// Endpoint to get a specific claim by ID
router.get('/claims/:id', (req, res) => {
    const claim = claims.find(c => c.id === parseInt(req.params.id));
    if (!claim) return res.status(404).send('The claim with the given ID was not found.');
    res.json(claim);
});

// Endpoint to update a claim
router.put('/claims/:id', (req, res) => {
    const index = claims.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('The claim with the given ID was not found.');
    claims[index] = { ...claims[index], ...req.body }; // Update claim
    res.json(claims[index]);
});

// Endpoint to delete a claim
router.delete('/claims/:id', (req, res) => {
    const index = claims.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('The claim with the given ID was not found.');
    claims.splice(index, 1);
    res.status(204).send();
});

module.exports = router;

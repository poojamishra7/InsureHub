'use strict';

const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Validation Schemas
const policySchema = Joi.object({
    id: Joi.string().required(),
    type: Joi.string().valid('type1', 'type2', 'type3').required(),
    details: Joi.string().required(),
});

// Sample Database
let policies = [];

// Get All Policies
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < policies.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = policies.slice(startIndex, endIndex);
    res.json(results);
});

// Get Policy by ID
router.get('/:id', (req, res) => {
    const policy = policies.find(p => p.id === req.params.id);
    if (!policy) return res.status(404).send('Policy not found');
    res.json(policy);
});

// Create a Policy
router.post('/', (req, res) => {
    const { error } = policySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const policy = { id: Date.now().toString(), ...req.body };
    policies.push(policy);
    res.status(201).json(policy);
});

// Update a Policy
router.put('/:id', (req, res) => {
    const { error } = policySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const index = policies.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send('Policy not found');
    policies[index] = { id: req.params.id, ...req.body };
    res.json(policies[index]);
});

// Delete a Policy
router.delete('/:id', (req, res) => {
    const index = policies.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send('Policy not found');
    policies.splice(index, 1);
    res.status(204).send();
});

// Get Policies by Type
router.get('/type/:type', (req, res) => {
    const filteredPolicies = policies.filter(p => p.type === req.params.type);
    res.json(filteredPolicies);
});

module.exports = router;

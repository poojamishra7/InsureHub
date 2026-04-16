const express = require('express');
const router = express.Router();

// Mock database for demonstration
let purchases = [];

// Create a policy purchase
router.post('/', (req, res) => {
    const { policyId, userId, amount } = req.body;
    const newPurchase = { id: purchases.length + 1, policyId, userId, amount, date: new Date() };
    purchases.push(newPurchase);
    res.status(201).json(newPurchase);
});

// Get all policy purchases
router.get('/', (req, res) => {
    res.json(purchases);
});

// Get a specific policy purchase by ID
router.get('/:id', (req, res) => {
    const purchase = purchases.find(p => p.id === parseInt(req.params.id));
    if (!purchase) return res.status(404).send('Purchase not found');
    res.json(purchase);
});

// Update a policy purchase
router.put('/:id', (req, res) => {
    const purchase = purchases.find(p => p.id === parseInt(req.params.id));
    if (!purchase) return res.status(404).send('Purchase not found');

    const { policyId, userId, amount } = req.body;
    purchase.policyId = policyId;
    purchase.userId = userId;
    purchase.amount = amount;
    res.json(purchase);
});

// Delete a policy purchase
router.delete('/:id', (req, res) => {
    const purchaseIndex = purchases.findIndex(p => p.id === parseInt(req.params.id));
    if (purchaseIndex === -1) return res.status(404).send('Purchase not found');
    purchases.splice(purchaseIndex, 1);
    res.status(204).send();
});

module.exports = router;

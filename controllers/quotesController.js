const Quote = require('../models/Quote');
const Customer = require('../models/Customer');

// Function to generate a quote for a customer based on risk assessment
exports.generateQuote = async (customerId, riskFactors) => {
    // Implement risk-based pricing logic here
    const customer = await Customer.findById(customerId);
    let basePrice = 100; // Base price for the quote
    let riskAdjustment = 0;

    // Assess risk factors to adjust quote price
    riskFactors.forEach(factor => {
        riskAdjustment += factor.weight;
    });

    const finalPrice = basePrice + riskAdjustment;
    const quote = new Quote({ customerId, amount: finalPrice });
    return await quote.save();
};

// Function to get quote by ID
exports.getQuoteById = async (quoteId) => {
    return await Quote.findById(quoteId);
};

// Function to get all quotes for a customer
exports.getCustomerQuotes = async (customerId) => {
    return await Quote.find({ customerId });
};

// Function to accept a quote
exports.acceptQuote = async (quoteId) => {
    const quote = await Quote.findByIdAndUpdate(quoteId, { accepted: true });
    return quote;
};

// Function to reject a quote
exports.rejectQuote = async (quoteId) => {
    const quote = await Quote.findByIdAndUpdate(quoteId, { rejected: true });
    return quote;
};

// Function to get all quotes
exports.getAllQuotes = async () => {
    return await Quote.find();
};

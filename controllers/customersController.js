// customersController.js

const Customer = require('../models/Customer'); // Assuming you have a Customer model

// Get the current user's profile
const getCurrentProfile = async (req, res) => {
    const customerId = req.user.id; // Assuming req.user contains user information
    try {
        const customer = await Customer.findById(customerId);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
};

// Update the user's profile
const updateProfile = async (req, res) => {
    const customerId = req.user.id;
    const updatedData = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error });
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error });
    }
};

// Update KYC status
const updateKYCStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(id, { kycStatus: status }, { new: true });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating KYC status', error });
    }
};

// Toggle account status
const toggleAccountStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        customer.isActive = !customer.isActive;
        await customer.save();
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling account status', error });
    }
};

// Get customer statistics
const getCustomerStatistics = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const activeCustomers = await Customer.countDocuments({ isActive: true });
        res.status(200).json({ totalCustomers, activeCustomers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer statistics', error });
    }
};

// Change password
const changePassword = async (req, res) => {
    const customerId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    try {
        const customer = await Customer.findById(customerId);
        // Assuming you have a method to validate the current password
        const isMatch = await customer.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        customer.password = newPassword;
        await customer.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
};

module.exports = {
    getCurrentProfile,
    updateProfile,
    getCustomerById,
    getAllCustomers,
    updateKYCStatus,
    toggleAccountStatus,
    getCustomerStatistics,
    changePassword,
};

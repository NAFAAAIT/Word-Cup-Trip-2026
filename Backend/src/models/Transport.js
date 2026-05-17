const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    routeId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    destination: { type: String, required: true },
    frequency: { type: String },
    status: { type: String, default: 'SCHEDULED' },
    note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);

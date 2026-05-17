const express = require('express');
const {
    getTransports,
    getTransportById,
    createTransport,
    updateTransport,
    deleteTransport,
} = require('../controllers/transportController');

const { protect, authorize } = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', getTransports);
router.get('/:id', validateObjectId, getTransportById);

// Admin actions
router.post('/', protect, authorize('admin'), createTransport);
router.put('/:id', protect, authorize('admin'), validateObjectId, updateTransport);
router.delete('/:id', protect, authorize('admin'), validateObjectId, deleteTransport);

module.exports = router;

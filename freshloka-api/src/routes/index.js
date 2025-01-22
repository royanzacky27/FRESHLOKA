const express = require('express');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/api/auth', authRoutes);

router.get('/', (req, res) => {
    res.status(200).json({
        data: {
            name: 'Freshloka API',
            version: '1.0.0',
            description: 'Marketplace lokal untuk buah, sayuran, dan kebutuhan dapur segar.',
        },
    });
});

module.exports = router;

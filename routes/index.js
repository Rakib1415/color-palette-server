const router = require('express').Router();
const authRoutes = require('./auth');
const paletteRoutes = require('./palette');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/palettes', paletteRoutes);
module.exports = router;

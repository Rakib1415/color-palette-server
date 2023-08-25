const router = require('express').Router();
const {
    createPaletteController,
    getPalettesController,
    getPaletteController,
    getFavoritePalettesController,
    updatePaletteStatusController,
    togglePaletteFavoriteController,
    getPalettesBySearchQuery,
} = require('../controllers/palette');
const authenticate = require('../middlewares/authenticate');
const { paletteValidationRules, validate } = require('../middlewares/validator');

router.post('/', paletteValidationRules(), validate, authenticate, createPaletteController);

router.get('/', getPalettesController);
router.get('/search', getPalettesBySearchQuery);
router.get('/favorites', getFavoritePalettesController);

router.get('/:paletteId', getPaletteController);

router.post('/:paletteId/status', authenticate, updatePaletteStatusController);
router.post('/:paletteId/favorite', authenticate, togglePaletteFavoriteController);

module.exports = router;

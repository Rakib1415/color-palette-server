/* eslint-disable no-underscore-dangle */
const { default: mongoose } = require('mongoose');
const error = require('../utils/error');
const { colorDistance } = require('../utils');
const { createNewPalette, findPalettes, findPaletteById } = require('../services/palette');

const createPaletteController = async (req, res, next) => {
    const { name, dominantColors, accentColors, status } = req.body;
    if (!name || !dominantColors || !accentColors) {
        return next(error('Invalid data', 400));
    }
    try {
        const palette = await createNewPalette({
            name,
            dominantColors,
            accentColors,
            status,
            userId: req.user._id,
        });
        return res.status(201).json({ message: 'Pelette created successfully', palette });
    } catch (e) {
        console.log(e.message);
        return next(e);
    }
};

const getPalettesController = async (_req, res, next) => {
    try {
        const palettes = await findPalettes('status', 'public');
        return res.status(200).json({ message: 'success', palettes });
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

const getFavoritePalettesController = async (_req, res, next) => {
    try {
        const palettes = await findPalettes('isFavorite', true);
        return res.status(200).json({ message: 'success', palettes });
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

const getPaletteController = async (req, res, next) => {
    const { paletteId } = req.params;
    if (!mongoose.isValidObjectId(paletteId)) {
        return next(error('invalid object id', 400));
    }
    try {
        const palette = await findPaletteById(paletteId);
        return res.status(200).json({ message: 'success', palette });
    } catch (e) {
        return next(e);
    }
};

const updatePaletteStatusController = async (req, res, next) => {
    const { paletteId } = req.params;
    if (!mongoose.isValidObjectId(paletteId)) {
        return next(error('invalid object id', 400));
    }
    try {
        const palette = await findPaletteById(paletteId);
        palette.status = req?.body?.status;
        await palette.save();
        return res.status(200).json({ message: 'successfully updated!', palette });
    } catch (e) {
        return next(e);
    }
};
const togglePaletteFavoriteController = async (req, res, next) => {
    const { paletteId } = req.params;
    if (!mongoose.isValidObjectId(paletteId)) {
        return next(error('invalid object id', 400));
    }
    try {
        const palette = await findPaletteById(paletteId);
        palette.isFavorite = !palette.isFavorite;
        await palette.save();
        return res.status(200).json({ message: 'successfully updated!', palette });
    } catch (e) {
        return next(e);
    }
};

const getPalettesBySearchQuery = async (req, res, next) => {
    const name = req?.query?.name?.toLowerCase();
    const targetColor = req?.query?.color;
    let matchingPalettes;

    try {
        const palettes = await findPalettes('status', 'public');
        if (name) {
            matchingPalettes = palettes.filter((palette) =>
                palette?.name?.toLowerCase().includes(name)
            );
        }
        if (targetColor) {
            const matchingThreshold = 100;

            matchingPalettes = palettes?.filter((palette) => palette?.dominantColors?.some(
                    (color) => colorDistance(targetColor, color) < matchingThreshold
                ));
        }
        return res.status(200).json({ message: 'success', matchingPalettes });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createPaletteController,
    getPalettesController,
    getPaletteController,
    getFavoritePalettesController,
    updatePaletteStatusController,
    togglePaletteFavoriteController,
    getPalettesBySearchQuery,
};

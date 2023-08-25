/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */

const Palette = require('../models/Palette');
const error = require('../utils/error');

const findPalettes = (key, value) =>
    Palette.find({ [key]: value }).populate({ path: 'user', select: ['name', 'email'] });

const findPaletteById = (paletteId) =>
    Palette.findById(paletteId).populate({ path: 'user', select: ['name', 'email'] });

const findPaletteByProperty = (key, value) => {
    if (key === '_id') {
        return Palette.findById(value);
    }
    return Palette.findOne({ [key]: value });
};

const createNewPalette = async ({ name, dominantColors, accentColors, userId, status }) => {
    const existingPalette = await findPaletteByProperty('name', name);
    if (existingPalette) {
        throw error('Palette already exists', 400);
    }
    const palette = new Palette({
        name,
        dominantColors,
        accentColors,
        user: userId,
        status: status || 'public',
    });

    return palette.save();
};

module.exports = {
    createNewPalette,
    findPaletteByProperty,
    findPalettes,
    findPaletteById,
};

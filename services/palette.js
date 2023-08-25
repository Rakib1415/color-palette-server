/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */

const Palette = require('../models/Palette');
const error = require('../utils/error');

/**
 * find all palette by key value pair.
 *
 * @param {string} key - The first param.
 * @param {string}} value - The second param.
 * @returns {array} find user .
 */
const findPalettes = (key, value) =>
    Palette.find({ [key]: value }).populate({ path: 'user', select: ['name', 'email'] });

/**
 * find one palette by id.
 *
 * @param {string} paletteId - The first param.
 * @returns {object} find user .
 */
const findPaletteById = (paletteId) =>
    Palette.findById(paletteId).populate({ path: 'user', select: ['name', 'email'] });

const findPaletteByProperty = (key, value) => {
    if (key === '_id') {
        return Palette.findById(value);
    }
    return Palette.findOne({ [key]: value });
};

/**
 * create palette.
 *
 * @param {string} name - The first param.
 * @param {[string]} dominantColors - The second param.
 * @param {[string]} accentColors - The third param.
 * @param {string} userId- The fourth param.
 * @param {string} status- The fifth param.
 * @returns {promise} find user .
 */
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

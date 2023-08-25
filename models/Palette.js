const { Schema, model } = require('mongoose');

const paletteSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: [2, 'name is too short'],
            maxlength: [20, 'name is too long'],
        },
        dominantColors: [
            {
                type: String,
                required: true,
            },
        ],
        accentColors: [
            {
                type: String,
                required: true,
            },
        ],
        isFavorite: {
            type: Boolean,
            required: true,
            enum: [true, false],
            default: false,
        },
        status: {
            type: String,
            required: true,
            enum: ['public', 'private'],
            default: 'public',
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Palette = model('Palette', paletteSchema);

module.exports = Palette;

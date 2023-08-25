/**
 * Function to compare colors using Euclidean distance
 *
 * @param {string} color1 - The first params.
 * @param {string} color2 - The second params.
 * @returns {number} return Euclidean distance.
 */
function colorDistance(color1, color2) {
    // Convert hex to RGB
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    // Calculate Euclidean distance
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

module.exports = {
    colorDistance,
};

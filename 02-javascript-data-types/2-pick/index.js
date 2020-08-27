/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const arrObj = Object.entries(obj)
    const results = []
    for (let i = 0; i < arrObj.length; i++) {
        if (fields.includes(arrObj[i][0]) === true) {
            results.push(arrObj[i]);
        }
    }
    return Object.fromEntries(results);
}
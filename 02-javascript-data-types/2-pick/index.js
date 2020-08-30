/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    const arrObj = Object.keys(obj)
    const result = {}
    for (const key of arrObj) {
        if (fields.includes(key) === true) {
            result[key] = obj[key]
        }
    }
    return result;
}
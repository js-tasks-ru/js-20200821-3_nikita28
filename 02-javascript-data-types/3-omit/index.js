/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const arrObj = Object.keys(obj)
    const result = {}
    for (const key of arrObj) {
        if (!fields.includes(key)) {
            result[key] = obj[key]
        }
    }
    return result;
}


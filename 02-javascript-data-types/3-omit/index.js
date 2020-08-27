/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const arrObj = Object.entries(obj)
    const results = []
    for (let i = 0; i < arrObj.length; i++) {
        if (fields.includes(arrObj[i][0]) === false) {
            results.push(arrObj[i]);
        }
    }
    return Object.fromEntries(results);
}


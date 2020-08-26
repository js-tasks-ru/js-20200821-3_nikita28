/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let arrFruit = Object.entries(obj)
    let result = []
    for (let i = 0; i < arrFruit.length; i++) {
        if (fields.includes(arrFruit[i][0]) === false) {
            result.push(arrFruit[i]);
        }
    }
    return Object.fromEntries(result);
}


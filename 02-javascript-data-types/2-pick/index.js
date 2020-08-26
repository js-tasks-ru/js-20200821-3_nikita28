/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let arrFruit = Object.entries(obj)
    let result = []
    for (let i = 0; i < arrFruit.length; i++) {
        if (fields.includes(arrFruit[i][0]) === true) {
            result.push(arrFruit[i]);
        }
    }
    return Object.fromEntries(result);
}
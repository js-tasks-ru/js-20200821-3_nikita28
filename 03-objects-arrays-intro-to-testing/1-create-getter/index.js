/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const arr = path.split('.')
    return function (obj) {
        let objResult = { ...obj }
        for (const key of arr) {
            objResult = objResult[key]
            if (objResult === undefined) {
                return undefined
            }
        }
        return objResult
    }
}

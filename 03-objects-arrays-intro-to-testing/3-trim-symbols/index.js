/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size = 3) {
    let countString = 0
    const result = []
    const str1 = string.split('')
    if (size === 0) {
        return result.join('')
    }
    for (let i = 0; i < string.length; i++) {
        if (str1[i] === str1[i - 1] && countString < size) {
            ++countString
            result.push(str1[i])
        }
        else if (str1[i] != str1[i - 1]) {
            result.push(str1[i])
            countString = 1
        }
    }
    return result.join('')
}
/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
   const collator = new Intl.Collator(undefined, { caseFirst: "upper" })
   const arrSort = [...arr]
   const direction = {
      asc: 1,
      desc: -1
    };
    
    return arrSort.sort((a, b) => direction[param] * collator.compare(a, b));
}



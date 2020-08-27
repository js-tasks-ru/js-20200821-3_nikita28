/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
   const collator = new Intl.Collator(undefined, { caseFirst: "upper" })
   const arrSort = arr.concat()
   if (param == 'asc') {
      return arrSort.sort(collator.compare)
   }
   else {
      return arrSort.sort(collator.compare).reverse()
   }
}



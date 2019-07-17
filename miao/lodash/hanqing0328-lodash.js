var hanqing0328 = function () {
  
/**
 * compact
 * Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
 * @param {*} arry 
 * @returns (Array): Returns the new array of filtered values.
 * Example :
 * input:compact([0, 1, false, 2, '', 3])
 * out:[1, 2, 3]
 */
  function compact(ary) {
    return ary.filter(it => it)
  }



/**
 * every
 * Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey.
 * @param collection (Array|Object)
 * @param [predicate=_.identity] (Function)
 * @returns (boolean): Returns true if all elements pass the predicate check, else false.
 * @Example
 * input:every([true, 1, null, 'yes'], Boolean)
 * output:false
 */
  function every(ary, predicate) {
    for(var i = 0 ; i < ary.length ; i++) {
      if(!predicate(ary[i])) {
        return false
      }
    }
    return true
  }








  return {
    compact,
    every,


  }
} ()
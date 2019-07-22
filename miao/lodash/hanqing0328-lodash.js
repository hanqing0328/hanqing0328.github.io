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
      if(!predicate(ary[i], i, ary)) {
        return false
      }
    }
    return true
  }

  function every2(ary, predicate) {
    return ary.reduce((result, item, val, ary) => {
      result && predicate(item, val, ary)
    },true)
  }
 
  function every3(ary, predicate) {
    return !some(ary, function(...args){
      return !predicate(...args)
    })
  }


 /**
  * some
  * Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate returns truthy
  * @param collection (Array|Object): The collection to iterate over.
  * @returns (boolean): Returns true if any element passes the predicate check, else false.
  * @Example
  * input: some([null, 0, 'yes', false], Boolean);
  * output:=> true
  */
  function some(ary, predicate) {
    for(var i = 0 ; i < ary.length ; i++) {
      if(predicate(ary[i], i, ary)) {
        return true
      }
    }
    return flase
  }

  function some2(ary, predicate) {
    return ary.reduce((item, val, ary) => {
      return result || predicate(item, val, ary)
    },false)
  }

  function some3(ary, predicate) {
    return !every(ary,function(...args){
      return !predicate(...args)
    })
  }
  


  /**
   * negate
   * Creates a function that negates the result of the predicate func. The func predicate is invoked with the this binding and arguments of the created function.
   * @param  predicate (Function): The predicate to negate.
   * @returns (Function): Returns the new negated function.
   * @Example var isOdd = negate(isEven)
   */
   function negate(f){
     return function(...args){
       return !f(...args)
     }
   }

   /**
    * flip
    * Creates a function that invokes func with arguments reversed.
    * @param func (Function): The function to flip arguments for.
    * @returns (Function): Returns the new flipped function.
    * @example:
    * var flipped = flip(function() {
    *    return toArray(arguments);
    *  });
    * 
    * flipped('a', 'b', 'c', 'd');
    * // => ['d', 'c', 'b', 'a']
    */

    function flip(f){
      return function(...args){
        return f(...args.reverse())
      }
    }


    function forOwn(obj, iterator){
      var hasOwn = Object.prototype.hasOwnProperty
      for(var key in obj){
        if(hasOwn.call(obj, key)){
          iterator(obj,key)
        }
      }
    }

  return {
    compact,
    every,
    some,
    negate,
    flip,

  }
} ()
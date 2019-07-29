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
   function negate(f) {
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

    function flip(f) {
      return function(...args) {
        return f(...args.reverse())
      }
    }

   /**
    * 迭代对象的所有自有属性
    * 用法： 
    * forOwn({a:1,b:2}, (val, key, obj) => {
    * 
    * })
    */
    function forOwn(obj, iterator) {
      var hasOwn = Object.prototype.hasOwnProperty
      for(var key in obj){
        if(hasOwn.call(obj, key)) {
          iterator(obj[key], key, obj)
        }
      }
    }

    /**
     * 只调用n次的方法，超过n次以后返回第n次结果。不再调用方法
     * 
     */
    function before(n, func) {
      var times = 0
      var lastreulst
      return function(...args) {
        times++   
        if(times < n){
          return lastreulst = func(...args)
        }else{
          return lastreulst
        }
      }
    }

    /**
     * 调用n次以后才开始正常开始调用
     */
    function after(n, func) {
      var times = 0
      var lastreulst
      return function(...args) {
        times++   
        if(times > n){
          return lastreulst = func(...args)
        }else{
          return lastreulst
        }
      }
    }


    /**
     * 创建一个函数，给原函数传n个参数
     */

    function ary(f, n = f.length) {
      return function(...args) {
        return f(...args.slice(0,n))
      }
    }
   

    /**
     * 
     * @param {*} arry 
     * @param {*} size 
     * 把数组按照size平均分配到另一个数组上，之后返回
     * 平均分配之后剩下的部分照样打包返回
     */
    function chunk(ary, size = 1) {
      var result = []
      while(ary.length >= size) {
        result.push(ary.splice(0, size))
      }
      if(ary.length > 0){
        result.push(ary)
      }
      return result
    }

    /**
     * 
     * @param {*} ary 
     * @param {*} values 
     * 根据后面提供的数组，排除前面数组里的相同元素
     * 返回剩下的元素
     */
    function difference(ary, ...value) {   //三个点接收的数组，后面value就变成多维数组
       var values = []
       values = values.concat(...value)   //最外层flatten数组
       return ary.filter(item =>         //记得箭头函数单行不能有花括号
        !values.includes(item))          //数组里包不包括某个值，用includes判断
    }
    
    /**
     * 
     * @param {*} ary 
     * @param {*} values 
     * @param {*} iteratee 
     */
    function differenceBy(ary, values, iteratee) {
      var result = []
      for(var vals of ary) {
        result.push(iteratee(vals))
      }
      for(var val of values) {
        if(result.indexOf(iteratee(val)) != -1) {
          result.splice(result.indexOf(val) , 1)
          ary.splice(result.indexOf(val) , 1)
        }
      }
      return ary    
    }

    /**
     * 从数组的左边开始删除n个数
     * @param {*} ary 
     * @param {*} n 
     */
    function drop(ary, n = 1) {
      ary.splice(0,n)
      return ary
      //return ary.slice(n)
    }

    /**
     * 从数组的右边开始删除n个数
     * @param {*} ary 
     * @param {*} n 
     */
    function dropRight(ary, n = 1 ) {
      var idx = ary.length - n 
      ary.splice(idx)
      return ary
    }


    /**
     * 往ary数组里从start位置到end位置替换成val元素
     * @param {*} ary 
     * @param {*} val 
     * @param {*} start 
     * @param {*} end 
     */
    function fill(ary, val, start = 0, end = ary.length) {
      for(var i = 0 ; i < end - start ; i++) {
        ary.splice(start + i, 1, val)
      }
      return ary
    }

    /**
     * 多维数组只展平一层
     * @param {*} ary 
     */
    function flatten(ary) {
      return [].concat(...ary)
    }

    /**
     * 多维数组完全展平
     */
    function flattenDeep(ary) {
      var result = []
      for(var i of ary) {
        if(Array.isArray(i)) {   // 判断是不是数组的方法
          var arys = flattenDeep(i)
          result.push(...arys)
        } else {
          result.push(i)
        }
      }
      return result
    }

    /**
     * 多维数组展平depth次
     * @param {*} ary 
     * @param {*} depth 
     */
    function flattenDepth(ary,depth = 1) {
      var result = []
      for(var i of ary) {
        if(Array.isArray(i)) {
          var flattendAry = flattenDepth(i, depth--)
        } else {
           result.push(...flattendAry)
        }
      }
      return result

      // return Array(depth).fill(0).reduce(ary => {
      //   return flatten(ary)
      // }, ary)
    }
   
    /**
     * 把数组里的数组重新放在对象里
     * @param {*} ary 
     * @example
     * input：fromPairs([['a', 1], ['b', 2]]);
     * output： => { 'a': 1, 'b': 2 }
     */
    function fromPairs(ary) {
      var result = {}
      ary.forEach(item => result[item[0]] = item[1])
      return result
    }
    

    function head(ary) {
      return ary[0]
    }

    function indexOf(ary, val, fromIndex = 0) {
      for(var i = fromIndex; i < ary.length ; i++) {
        if(ary[i] == val) {
          return i
        }
      }
      return -1
    }

    function initial(ary) {
      return ary.slice(0,ary.length - 1)
    }


    function intersection(...ary) {
      return ary.reduce(function(pre,b) {
        for(var i of pre) {
          if(b.indexOf(i) < 0) {
          pre.splice(pre.indexOf(i))
          return pre
          }
        }
      })
    }


    function join(ary, separator = ",") {
      return ary.slice(1).reduce((pre, cur, index = 1) => 
      pre += separator + cur,String(ary[0]))
    }
    

    function last(ary) {
      return ary.splice(ary.length - 1)
    }


    function lastIndexOf(ary, val, fromIndex = ary.length - 1) {
      for(var i = fromIndex; i >= 0 ; i--) {
        if(ary[i] == val) {
          return i
        }
      }
      return -1
    }


    function nth(ary, n = 0) {
      return n >= 0? ary[n] : ary[ary.length + n]
    }

    function pull(ary, ...vals) {
      return ary.reduce((pre,cur) => {
        if(!vals.includes(cur)) {
          pre.push(cur)
        }
        return pre
      },[])
    }


    function pullAll(ary, vals) {
      return ary.reduce((pre,cur) => {
        if(!vals.includes(cur)) {
          pre.push(cur)
        }
        return pre
      },[])
    }


    function reverse(ary) {
      var result = []
      for(var i = ary.length - 1; i >=0; i--) {
        result.push(ary[i])
      }
      return result
    }

  return {
    compact,
    every,
    some,
    negate,
    flip,
    forOwn,
    before,
    after,
    ary,
    chunk,
    difference,
    differenceBy,
    drop,
    dropRight,
    fill,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    reverse,
  }
} ()
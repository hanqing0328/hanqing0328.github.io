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
      if(idx < 0) {
        idx = 0
      }
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
    function flattenDepth(ary, depth = 1, result = []) {
      for(var i of ary) {
        if(Array.isArray(i) && depth > 0) {
          var flattendAry = flattenDepth(i, depth - 1, result)
        } else {
           result.push(i)
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


    /**
     * 返回数组的除了最后一项以外的数组
     * @param {} ary 
     */
    function initial(ary) {
      return ary.slice(0,ary.length - 1)
    }

    /**
     * 返回所有数组中全部包含的值的数组
     * Creates an array of unique values that are included in all given arrays
     * @param  {...any} ary 
     */
    function intersection(...ary) {
      return ary.reduce(function(pre,cur) {
        for(var item of pre) {
          if(cur.indexOf(item) < 0) {
          pre.splice(pre.indexOf(item))
          return pre
          }
        }
      })
    }

    /**
     * 把数组里的各项用指定符号当分隔符，组成字符串
     * @param {*} ary 
     * @param {*} separator 
     */
    function join(ary, separator = ",") {
      return ary.slice(1).reduce((pre, cur, index = 1) => 
      pre += separator + String(cur),String(ary[0]))
    }
    
    /**
     * 返回数组的最后一项
     */
    function last(ary) {
      return ary[ary.length - 1]
    }

    /**
     * 从数组的后面开始查找指定值的下标
     * @param {*} ary 
     * @param {*} val 
     * @param {*} fromIndex 
     */
    function lastIndexOf(ary, val, fromIndex = ary.length - 1) {
      for(var i = fromIndex; i >= 0 ; i--) {
        if(ary[i] == val) {
          return i
        }
      }
      return -1
    }

    /**
     * 返回数组的n下标的值
     * @param {*} ary 
     * @param {*} n 
     */
    function nth(ary, n = 0) {
      return n >= 0? ary[n] : ary[ary.length + n]
    }
    

    /**
     * 从数组排除所有指定值vals
     * @param {*} ary 
     * @param  {...any} vals 
     */
    function pull(ary, ...vals) {
      return ary.reduce((pre,cur) => {
        if(!vals.includes(cur)) {
          pre.push(cur)
        }
        return pre
      },[])
    }

    /**
     * 从数组里排除指定值vals
     * @param {*} ary 
     * @param {*} vals 
     */
    function pullAll(ary, vals) {
      return ary.reduce((pre,cur) => {
        if(!vals.includes(cur)) {
          pre.push(cur)
        }
        return pre
      },[])
    }

    /**
     * 把数组倒序排放
     * @param {*} ary 
     */
    function reverse(ary) {
      var result = []
      for(var i = ary.length - 1; i >=0; i--) {
        result.push(ary[i])
      }
      return result
    }


    /**
     * 把val值按照顺序插入数组里
     * @param {*} ary 
     * @param {*} val 
     */

    function sortedIndex(ary, val) {
      for(var i = 0 ; i < ary.length ; i++) {
        if(ary[i] >= val) {
          return i 
        }
      }
    }


    /**
     * 返回所有数组中出现过的值的集合
     * @param  {...any} arys 
     */
    function union(...arys) {
      var aryTotal = flattenDeep(arys)
      var result = []
      for(var item of aryTotal) {
        if(!result.includes(item)) {
          result.push(item)
        }
      }
      return result
    }

    /**
     * 返回新数组，从给的ary中排除指定值values以后的数组
     * @param {*} ary 
     * @param  {...any} values 
     */
    function without(ary,...values) {
      var result = []
      for(var item of ary) {
        if(!values.includes(item)) {
          result.push(item)
        }
      }
      return result
    }


    function xor(...ary) {
      var aryTotal = flattenDeep(ary)
      var result = []
      var cache = []
      var length = aryTotal.length
      for(var i = 0; i < length; i++) {
        var cur = aryTotal.shift()
        if(!aryTotal.includes(cur) && !cache.includes(cur)) {
          result.push(cur)
        } else {
          cache.push(cur)
        }
      }
      return result
    }


   //obj 包括src就返回true
//思路： 1）obj本身已经跟src本身相同 =》 直接返回true
//       2)遍历src对象里的所有属性值
//      3）如果src的属性值又是对象，需要跟obj一起递归，深层比较
//           =》深层比较结果为false就返回false
//      4） 如果src的属性值不是对象，直接与obj的属性值做比较
//           =》如果不同返回false
//      5） 以上都通过了就返回true
function isMatch(obj, src) {
  if(obj === src) {  // 1)
    return true
  }
  for(var key in src) {  //2) 注意不是key of
    if(typeof(src[key]) == 'object' && src[key] !== null) {  // 3)
      if(!isMatch(obj[key], src[key])) {  // 返回结果如果是false就返回false
        return false
      }
    } else {
      if(obj[key] !== src[key]) {
        return false
      }
    }
  }
  return true
}

//绑定一个函数的参数， 可有参数占位符，绑定指定位置的参数
//如： 传 1, window, 2, 3 （用全局变量window代替占位符，lodashi里的下划线）
// 调用函数时如果传4，5
//实际接收到的参数时 1，4，2，3，5 (依此从左传给window，剩下的push到最后即可)

function bind(f, thisArg, ...fixedArgs) {
  return function(...args) {
    var realArgs = [...fixedArgs]
    for(var i = 0 ; i < realArgs.length; i++) {
      if(realArgs[i] === window) {
        realArgs[i] == args.shift()
      }
    }
    realArgs.push(...args)
    return f.apply(thisArg, realArgs)
  }
}

//返回一个对比函数判断某个对象是否包含某个属性，也就是固定isMatch的第二个参数

function matches(src) {
  return function(obj) {
    return isMatch(obj, src)
  }
}

function matches(src) {
  return bind(isMatch, null, window, src)   // 带占位符window的bind
}

//接收字符串形式的路径返回数组形式的路径
//toPath('a[0].b.c');
// => ['a', '0', 'b', 'c']
function toPath(str) {
  return str.split(/\.|\[|\]./g)  //是].
}

//返回一个对象的指定路径的属性，如果没有就返回默认值

function get(obj, path, defaultVal) {
  var path = toPath(path)
  for(var i = 0 ; i < path.length ; i++) {
    if(obj === undefined) {
      return defaultVal
    }
    obj = obj[path[i]]
  }
  return obj
}


//返回一个函数，对比某一个对象的那个路径下的属性值与要对比的值相同不相同

function matchesProperty(path, value) {
  return function(obj) {
    return isEqual(get(obj, path), value)  // isEqual深度对比两个对象， get通过path找到obj的属性
  }
}

//返回一个函数， 能给返回某个对象的目标路径的属性的函数
function property(path) {
  return function(obj) {
    return get(obj, path)
  }
}

//根据传的函数属性返回相应值 （matches，matchesproperty，property的综合版）
function iteratee(value) {
  if(typeof(value) == 'string') {  //如果是字符串返回字符串路径下能取（某个对象）属性的函数
    return property(value)
  }
  
  if(Array.isArray(value)) { //传数组返回一个函数，对比（某一个对象）的那个路径下的属性值与要对比的值相同不相同
    return matchesProperty(value)
  }
  
  if(typeof(value) == 'object') { //如果是对象返回一个函数（判断【某个对象】是否包含绑定的对象）
    return matches(value)
  }
  return value  //传函数直接返回函数
} 



//只有传够参数才开始调用函数，相当于中间把函数bind掉
  function curry(f, length = f.length) {
    return function(...args) {
      if(args.length === length) {
        return f(...args)
      } else {
        return curry(f.bind(null, ...args), length - args.length)
      }
    }
  }

//几个函数合并成一个函数后返回
  function composefunc(fs) {
    return function(...args) {
      var value = fs[0](...args)
      for(var i = 0 ; i < fs.length ; i++) {
        value = fs[i](value)
      }
      return value
    }
  }


//比交任何值相不相同

  function isEqual(value, other) {
    if(typeof(value) !== 'object' && typeof(other) !== 'object') {
      return value == other? true : false
    } else if(typeof(value) == 'object' && value !== null) {
      if(typeof(other) !== 'object') {
        return false
      }
      var valLength = value.length
      var otherLength = other.length
      if(valLength !== otherLength) {
        return false
      }
      
      for(var item in value) {
        if(!isEqual(value[item], other[item])) {
          return false
        }
      }
      
      return true
    }
  }





//传3个参数，第三个参数传方法， 第一个参数和第二个参数以第三个参数的方法做比较， 把第一个参数中不同的部分返回
// differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// // => [1.2]
 
// // The `_.property` iteratee shorthand.
// differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// // => [{ 'x': 2 }]

// function differenceBy(array, ...values) {
//   if (Array.isArray(values[values.length - 1])) {
//     return difference(array, ...values)
// }
//     var identity = values[values.length - 1]
//     var func = iteratee(identity)
//     var result = []
//     for(let i = 0 ; i < array.length; i++) {
//       for(let j = 0; j < values[0].length ; j++) {
//         var sign = true
//         if(isEqual(func(array[i]),func(values[0][j]))) {
//           sign = false
//           break
//         }
//       }
//       if(sign == true) {
//         result.push(array[i])
//       }
//     }
//     return result

//   } 



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
    sortedIndex,
    union,
    without,
    xor,
    isMatch,
    bind,
    matches,
    toPath,
    get,
    matchesProperty,
    property,
    iteratee,
    curry,
    composefunc,
  }
}()
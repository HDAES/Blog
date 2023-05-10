# JavaScript基础

## 1.基本类型

- string(字符串)
- boolean(布尔值)
- number(数字)
- null(空值)
- undefined（未定义
- symbol（符号）（ES6）
- BigInt（ES10）

## 2. 类型的判断

### typeof

```javascript
typeof 'hades'  	//string
typeof false 		//boolean
typeof 512			//number
typeof Symbol() 	//symbol
typeof null			//'object' 无法判定是否为 null
typeof undefined	//undefined
typeof {}			//object	
typeof []			//object	
typeof (() =>{})	//function
```

### instanceof

通过 `instanceof` 操作符也可以对对象类型进行判定，其原理就是测试构造函数的` prototype` 是否出现在被检测对象的原型链上。

```javascript
[] instanceof Array		//true
[] instanceof Object	//true
(()=>{}) instanceof Function   //true
```

`Object.prototype.toString()` 可以说是判定 `JavaScript` 中数据类型的终极解决方法

```javascript
Object.prototype.toString.call({})              // '[object Object]'
Object.prototype.toString.call([])              // '[object Array]'
Object.prototype.toString.call(() => {})        // '[object Function]'
Object.prototype.toString.call('seymoe')        // '[object String]'
Object.prototype.toString.call(1)               // '[object Number]'
Object.prototype.toString.call(true)            // '[object Boolean]'
Object.prototype.toString.call(Symbol())        // '[object Symbol]'
Object.prototype.toString.call(null)            // '[object Null]'
Object.prototype.toString.call(undefined)       // '[object Undefined]'

Object.prototype.toString.call(new Date())      // '[object Date]'
Object.prototype.toString.call(Math)            // '[object Math]'
Object.prototype.toString.call(new Set())       // '[object Set]'
Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
Object.prototype.toString.call(new Map())       // '[object Map]'
Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'
```

## 3.null和undefined的区别

null常用来描述“空值”。对null进行typeof运算，返回字符串"object"，也就是说可以将null认为是一个特殊的对象值，含义是“非对象”。

undefined用未定义的值表示更深层次的“空值”。它是变量的一种取值，表明变量没有初始化。

```javascript
undefined == null  	//true
undefined === null  //false
Number(undefined)  	//NAN
Number(null) 		//0
```

## 4.var、let和const区别

- var存在变量提升，可重复声明同一变量，声明的变量均可改
- let没有变量提升，不可重复声明同一变量，声明的变量均可改
- const没有变量提升，不可重复声明同一变量，声明的基本数据类型不可改，引用类型可改属性，不可只声明变量而不赋值

```javascript
a  				//undefined
var a = 1
b
let b = 1 		//ReferenceError: Cannot access 'b' before initialization
c
const c    		//SyntaxError: Missing initializer in const declaration
```

## 5. [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

基本字符串和字符串对象的区别

```javascript
let a = 'hades'
let b = new String(a)
typeof a  		//string
typeof b 		//object
```

### String.prototype.charAt()

**charAt()** 方法从一个字符串中返回指定的字符。

```javascript
'abcdefg'.charAt(1)  	//b
```

### String.prototype.concat()

**`concat()`** 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。

```javascript
let hello = 'Hello, '
hello.concat('Kevin', '. Have a nice day.')  // Hello, Kevin. Have a nice day.
```

### String.prototype.endsWith()

`endsWith()`方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 `true` 或 `false`。

```javascript
var str = "To be, or not to be, that is the question.";
alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true
```

### String.prototype.includes()

**`includes()`** 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

```javascript
let str = 'abcdefg'
str.includes('b')   //true
```

### String.prototype.indexOf()

`indexOf()` 方法返回调用它的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象中第一次出现的指定值的索引，从 `fromIndex` 处进行搜索。如果未找到该值，则返回 -1。

```javascript
"Blue Whale".indexOf('')  		//0
"Blue Whale".indexOf('Blute') 	//-1
"Blue Whale".indexOf('',  10)	//10
"Blue Whale".indexOf('',  11)   //10   11超过字符串长度，返回值为 字符串的长度

//统计字符串 字母出现的次数
let str = 'To be, or not to be, that is the question.';
let count = 0;
let pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```

### String.prototype.match()

**`match()`** 方法检索返回一个字符串匹配正则表达式的结果。

```javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
paragraph.match(regex);  // expected output: Array ["T", "I"]
```

### String.prototype.replace()

**`replace()`** 方法返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。**如果`pattern`是字符串，则仅替换第一个匹配项。**

```javascript
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"

const regex = /Dog/i;
console.log(p.replace(regex, 'ferret'));
```

在 replace() 中使用 global 和 ignore 选项

下面的例子中,正则表达式包含有全局替换(g)和忽略大小写(i)的选项,这使得replace方法用'oranges'替换掉了所有出现的"apples".

```javascript
let re = /apples/gi;
let str = "Apples are round, and apples are juicy.";
let newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);

let newstr1 = str.replaceAll(/apples/, "oranges"); 
//TypeError: replaceAll must be called with a global RegExp
let newstr1 = str.replaceAll(/apples/g, "oranges"); //必须加g
```

### String.prototype.search()

**`search()`** 方法执行正则表达式和 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象之间的一个搜索匹配。

```javascript
let str = "hey JudE";
let re = /[A-Z]/g;
let re2 = /[.]/g;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation
```

### String.prototype.slice()

**`slice()`** 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

```javascript
let str = 'The morning is upon us.'
console.log(str.slice(1, 8))	 //he morn
console.log(str.slice(4, -2)) 	//morning is upon u
console.log(str.slice(12))		//is upon us.
console.log(str.slice(30))		//""
console.log(str.slice(-3))		//us.
console.log(str.slice(-3,-1))	//us
console.log(str.slice(0, -1))	//'The morning is upon us'
```

### String.prototype.split()

`split() `方法使用指定的分隔符字符串将一个[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

```javascript
let names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ";
let re = /\s*(?:;|$)\s*/;
let nameList = names.split(re); 
//[ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand", "" ]

let nameList1 = names.split(re, 3);
//[ "Harry Trump", "Fred Barney", "Helen Rigby"]

如果 separator 包含捕获括号（capturing parentheses），则其匹配结果将会包含在返回的数组中。
let myString = "Hello 1 word. Sentence number 2.";
let splits = myString.split(/(\d)/);   //  \d 表示数字  （）捕获也放入数组中
// [ "Hello ", "1", " word. Sentence number ", "2", "." ]
let splits = myString.split(/\d/);  
//[ 'Hello ', ' word. Sentence number ', '.' ] 
```

### String.prototype.startsWith()

`startsWith()` 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。

```javascript
let str = "To be, or not to be, that is the question.";
alert(str.startsWith("To be"));         // true
alert(str.startsWith("not to be"));     // false
alert(str.startsWith("not to be", 10)); // true
```

### String.prototype.substring()

**`substring() `**方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

```javascript
let anyString = "Mozilla";
// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));
// 输出 "Mozill"
console.log(anyString.substring(0,6));
// 输出 "Mozilla"
console.log(anyString.substring(0,7));
```

### String.prototype.toLocaleLowerCase()

**`toLocaleLowerCase()`**方法根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。

### String.prototype.toLocaleUpperCase()

**`toLocaleUpperCase()`** 方法根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。

### String.prototype.toLowerCase()

`toLowerCase()` 会将调用该方法的字符串值转为小写形式，并返回。

### String.prototype.toUpperCase()

**`toUpperCase()`** 方法将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

### String.prototype.trim()

**`trim()`** 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

### String.prototype.trimRight()

`trimEnd()`方法从一个字符串的末端移除空白字符。trimRight() 是这个方法的别名。

### String.prototype.trimStart()

**`trimStart()`** 方法从字符串的开头删除空格。`trimLeft()` 是此方法的别名。

### String.prototype.valueOf()

**`valueOf()`** 方法返回 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象的原始值

## 6.Number

JavaScript 的 **`Number`** 对象是经过封装的能让你处理数字值的对象。`Number` 对象由 `Number()` 构造器创建。

### 属性

#### Number.EPSILON

**`Number.EPSILON`** 属性表示 1 与[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)可表示的大于 1 的最小的浮点数之间的差值。

```javascript
let a = 0.1
let b = 0.2
let c = 0.3
a+b == c 				//false
// a+b-c < Number.EPSILON  //true
```

#### Number.MAX_SAFE_INTEGER

**`Number.MAX_SAFE_INTEGER`** 常量表示在 JavaScript 中最大的安全整数（maxinum safe integer)（`253 - 1）。`

#### Number.MAX_VALUE

`Number.MAX_VALUE` 属性表示在 JavaScript 里所能表示的最大数值。

#### Number.MIN_SAFE_INTEGER

**`Number.MIN_SAFE_INTEGER`** 代表在 JavaScript中最小的安全的integer型数字 (`-(253 - 1)`).

#### Number.MIN_VALUE

`Number.MIN_VALUE` 属性表示在 JavaScript 中所能表示的最小的正值。

#### Number.NaN

`Number.NaN` 表示“非数字”（Not-A-Number）。和 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 相同。

#### Number.NEGATIVE_INFINITY

`Number.NEGATIVE_INFINITY` 属性表示负无穷大。

#### Number.POSITIVE_INFINITY

`Number.POSITIVE_INFINITY` 属性表示正无穷大。

### 方法

#### Number.isFinite()

**`Number.isFinite()`** 方法用来检测传入的参数是否是一个有穷数。

#### Number.isInteger()

**`Number.isInteger()`** 方法用来判断给定的参数是否为整数。

#### Number.isNaN()

**`Number.isNaN()`** 方法确定传递的值是否为 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)，并且检查其类型是否为 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)。它是原来的全局 [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 的更稳妥的版本。

```javascript
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

#### Number.parseFloat()

**`Number.parseFloat()`** 方法可以把一个字符串解析成浮点数。该方法与全局的 [`parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) 函数相同，并且处于 ECMAScript 6 规范中（用于全局变量的模块化）。

#### Number.parseInt()

**`Number.parseInt()`** 方法依据指定基数 [ 参数 **radix** 的值]，把字符串 [ 参数 **string** 的值] 解析成整数。

```javascript
Number.parseInt === parseInt; // true
```

#### Number.prototype.toFixed()

**toFixed()**` 方法使用定点表示法来格式化一个数值。

```javascript
let numObj = 12345.6789;
numObj.toFixed();   	//12346   进行四舍六入五看情况，不包括小数部分
numObj.toFixed(1);  	//12345.7   进行四舍六入五看情况，不包括小数部分
numObj.toFixed(6);  	//12345.678900 用0填充
2.55.toFixed(1)  		//2.5	  重点	
2.555.toFixed(1)  		//2.6
```

**Warning:** 浮点数不能精确地用二进制表示所有小数。这可能会导致意外的结果，例如 `0.1 + 0.2 === 0.3` 返回 `false`

#### Number.prototype.toPrecision()

**toPrecision()**` 方法以指定的精度返回该数值对象的字符串表示。

```javascript
let numObj = 5.123456;
console.log("numObj.toPrecision()  is " + numObj.toPrecision());  //输出 5.123456
console.log("numObj.toPrecision(5) is " + numObj.toPrecision(5)); //输出 5.1235
console.log("numObj.toPrecision(2) is " + numObj.toPrecision(2)); //输出 5.1
console.log("numObj.toPrecision(1) is " + numObj.toPrecision(1)); //输出 5
```

#### Number.prototype.toString()

**`toString()`** 方法返回指定 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 对象的字符串表示形式。

```javascript
numObj.toString([radix])   
// radix 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。

var count = 10;

console.log(count.toString());    // 输出 '10'
console.log((17).toString());     // 输出 '17'
console.log((17.2).toString());   // 输出 '17.2'

var x = 6;

console.log(x.toString(2));       // 输出 '110'
console.log((254).toString(16));  // 输出 'fe'

console.log((-10).toString(2));   // 输出 '-1010'
console.log((-0xff).toString(2)); // 输出 '-11111111'
```

## 7.Array

JavaScript的 **`Array`** 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。

### 方法

#### Array.prototype.concat()

`concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```javascript
let new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
let alpha = ['a', 'b', 'c'];
let numeric = [1, 2, 3];

alpha.concat(numeric);
// result in ['a', 'b', 'c', 1, 2, 3]
//alpha ['a', 'b', 'c']
```

#### Array.prototype.copyWithin()

`**copyWithin()**` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度，改变原数组。

```javascript
arr.copyWithin(target[, start[, end]])
let array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```

#### Array.prototype.entries()

`entries()` 方法返回一个新的**Array Iterator**对象，该对象包含数组中每个索引的键/值对。

```javascript
const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();
console.log(iterator1.next().value); / expected output: Array [0, "a"]

//二维数组按行排序
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}
```

#### Array.prototype.every()

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。若收到一个空数组，此方法在一切情况下都会返回 `true`。

```javascript
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

#### Array.prototype.filter()

`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

#### Array.prototype.find()

`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。

```javascript
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);
// expected output: 12
console.log(array1.findIndex(element => element > 10));
// expected output: 1
```

#### Array.prototype.flat()

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
var newArray = arr.flat([depth])
//depth 可选
//指定要提取嵌套数组的结构深度，默认值为 1。

const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//flat() 方法会移除数组中的空项:
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

#### Array.prototype.forEach()

`forEach()` 方法对数组的每个元素执行一次给定的函数。

```javascript
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])

const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"

const arraySparse = [1,3,,7];
let numCallbackRuns = 0;

//不对未初始化的值进行任何操作（稀疏数组）
arraySparse.forEach(function(element){
  console.log(element);
  numCallbackRuns++;
});

console.log("numCallbackRuns: ", numCallbackRuns);	
// 1
// 3
// 7
// numCallbackRuns: 3
```

除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。

#### Array.from()

`Array.from()` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```javascript
Array.from(arrayLike[, mapFn[, thisArg]])

console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
// [ "foo", "bar", "baz" ]  用做去重

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

#### Array.prototype.includes()

`includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

```javascript
arr.includes(valueToFind[, fromIndex])

[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true

var arr = ['a', 'b', 'c'];
carr.includes('c', -2) 			//true		等于  3-2 = 1 
arr.includes('a', -2)			//false    	等于  3-2 = 1 
arr.includes('a', -100); 		// true    	等于  3-100 = -97  小于0 时 全部都会被索引 
```

#### Array.prototype.indexOf()

`indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```javascript
arr.indexOf(searchElement[, fromIndex])

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));  	// expected output: 1
console.log(beasts.indexOf('giraffe')); // expected output: -1

```

#### Array.isArray()

**Array.isArray()** 用于确定传递的值是否是一个 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)。

```javascript
Array.isArray([1, 2, 3]);// true
Array.isArray({foo: 123});// false
```

#### Array.prototype.join()

`join()` 方法将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN_docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```javascript
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());		// expected output: "Fire,Air,Water"
console.log(elements.join(''));		// expected output: "FireAirWater"
console.log(elements.join('-'));	// expected output: "Fire-Air-Water"

const elements = ['Fire', 'Air', 'Water',NaN, undefined, null];
console.log(elements.join('-')); 	// Fire-Air-Water-NaN--
```

#### Array.prototype.keys()

`keys() `方法返回一个包含数组中每个索引键的`Array Iterator`对象。

```javascript
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

#### Array.prototype.map()

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

因为`map`生成一个新数组，当你不打算使用返回的新数组却使用`map`是违背设计初衷的，请用`forEach`或者`for-of`替代

#### Array.prototype.pop()

`pop()`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

```javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish);		// ["angel", "clown", "mandarin"]

console.log(popped);		// surgeon
```

#### Array.prototype.push()

`push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```javascript
arr.push(element1, ..., elementN)

var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");
console.log(sports);// ["soccer", "baseball", "football", "swimming"]
console.log(total);// 4
```

#### Array.prototype.reduce()

`reduce()` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
// initialValue 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 ( acc, cur ) => acc.concat(cur),
 []
);

计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }


```

#### Array.prototype.reverse()

`reverse()` 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```javascript
const a = [1, 2, 3];
a.reverse();
console.log(a); // [3, 2, 1]
```

#### Array.prototype.shift() 和 Array.prototype.unshift()

`shift()` 方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

**`unshift()`** 方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组**)**。

```javascript
const array1 = [1, 2, 3];
const firstElement = array1.shift();
console.log(array1);			// expected output: Array [2, 3]
console.log(firstElement);		// expected output: 1

const array2 = [1, 2, 3];
console.log(array2.unshift(4, 5));// expected output: 5
console.log(array2);			// expected output: Array [4, 5, 1, 2, 3]
```

#### Array.prototype.slice()

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

```javascript
arr.slice([begin[, end]])
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
animals.slice(2)		// ["camel", "duck", "elephant"]
animals.slice(2, 4)		// ["camel", "duck"]
animals.slice(1, 5)		// ["bison", "camel", "duck", "elephant"]
animals.slice(-2)		//["duck", "elephant"]
animals.slice(2, -1)	// ["camel", "duck"]
```

#### Array.prototype.some()

`some()` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
const array = [1, 2, 3, 4, 5];
const even = (element) => element % 2 === 0;
console.log(array.some(even));
// expected output: true
```

#### Array.prototype.sort()

`sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

```javascript
arr.sort([compareFunction])

var numbers = [4, 2, 5, 1, 3];
numbers.sort((a,b) => a - b)
console.log(numbers)			//[ 1, 2, 3, 4, 5 ]

var array1 = ["80", "9", "700", 40, 1, 5, 200];
array1.sort((a,b) => a - b) //[1,5,'9',40,'80', 200,'700']

var array2 = ["80", "xxx", "x", 40, 1, 5, 200,90];
array2.sort((a,b) => a-b)  //['80', 'xxx', 'x',1,5,200]

var array2 = ["xxx", "x","80", 40, 1, 5, 200,90];
array2.sort((a,b) => a-b)  //['xxx', 'x',1,5,'80', 200]
```

####     Array.prototype.splice()

**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```javascript
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');// inserts at index 1
console.log(months);// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');// replaces 1 element at index 4
console.log(months);// expected output: Array ["Jan", "Feb", "March", "April", "May"]

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```

## 8.Map

**`Map`** 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)) 都可以作为一个键或一个值。

### Objects 和 maps 的比较

[`Objects`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 和 `Maps` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Maps` 使用。不过 `Maps` 和 `Objects` 有一些重要的区别，在下列情况里使用 `Map` 会是更好的选择：

|              | **Map**                                                      | **Object**                                                   |
| ------------ | ------------------------------------------------------------ | :----------------------------------------------------------- |
| **意外的键** | `Map` 默认情况不包含任何键。只包含显式插入的键。             | 一个 `Object` 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。 |
| **键的类型** | 一个 `Map`的键可以是**任意值**，包括函数、对象或任意基本类型。 | 一个`Object` 的键必须是一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 或是[`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)。 |
| **键的顺序** | `Map` 中的 key 是有序的。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值。 | 一个 `Object` 的键是无序的                                   |
| **Size**     | `Map` 的键值对个数可以轻易地通过[`size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size) 属性获取 | `Object` 的键值对个数只能手动计算                            |
| **迭代**     | `Map` 是 [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) 的，所以可以直接被迭代。 | 迭代一个`Object`需要以某种方式获取它的键然后才能迭代。       |
| **性能**     | 在频繁增删键值对的场景下表现更好。                           | 在频繁添加和删除键值对的场景下未作出优化。                   |

```javascript
let myMap = new Map();
let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';
// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");

myMap.size; // 3
// 读取值
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get(keyObj);       // "和键keyObj关联的值"
myMap.get(keyFunc);      // "和键keyFunc关联的值"

myMap.get('a string');   // "和键'a string'关联的值"  // 因为keyString === 'a string'
myMap.get({});           // undefined, 因为keyObj !== {}
myMap.get(function() {}); // undefined, 因为keyFunc !== function () {}
```

### 将 NaN 作为 Map 的键

`NaN` 也可以作为`Map`对象的键。虽然 `NaN` 和任何值甚至和自己都不相等(`NaN !== NaN` 返回true)，但下面的例子表明，`NaN`作为Map的键来说是没有区别的:

```javascript
let myMap = new Map();
myMap.set(NaN, "not a number");
myMap.get(NaN); // "not a number"
let otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```

### 使用 for..of 方法迭代 Map

```javascript
let myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
// 将会显示两个log。一个是"0 = zero"另一个是"1 = one"

for (let key of myMap.keys()) {
  console.log(key);
}
// 将会显示两个log。 一个是 "0" 另一个是 "1"

for (let value of myMap.values()) {
  console.log(value);
}
// 将会显示两个log。 一个是 "zero" 另一个是 "one"

for (let [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"
```

### Map 与数组的关系

```javascript
let kvArray = [["key1", "value1"], ["key2", "value2"]];

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

### Map.prototype.clear()

`clear()`方法会移除Map对象中的所有元素。

```javascript
var myMap = new Map();
myMap.set("bar", "baz");
myMap.set(1, "foo");

myMap.size;       // 2
myMap.has("bar"); // true

myMap.clear();

myMap.size;       // 0
myMap.has("bar")  // false
```

### Map.prototype.delete()

`delete()` 方法用于移除 `Map` 对象中指定的元素。

```javascript
var myMap = new Map();
myMap.set("bar", "foo");

myMap.delete("bar"); // 返回 true。成功地移除元素
myMap.has("bar");    // 返回 false。"bar" 元素将不再存在于 Map 实例中
```

### Map.prototype.entries()

`entries()` 方法返回一个新的包含 `[key, value]` 对的 `**Iterator**` 对象，返回的迭代器的迭代顺序与 `Map` 对象的插入顺序相同。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.entries();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

### Map.prototype.forEach()

`forEach()` 方法按照插入顺序依次对 `Map` 中每个键/值对执行一次给定的函数

```javascript
function logMapElements(value, key, map) {
    console.log(`map.get('${key}') = ${value}`)
}
new Map([['foo', 3], ['bar', {}], ['baz', undefined]]).forEach(logMapElements)
// logs:
// "map.get('foo') = 3"
// "map.get('bar') = [object Object]"
// "map.get('baz') = undefined"
```

### Map.prototype.get()

`get()` 方法返回某个 `Map` 对象中的一个指定元素。

```javascript
const map1 = new Map();
map1.set('bar', 'foo');

console.log(map1.get('bar'));
// expected output: "foo"

console.log(map1.get('baz'));
// expected output: undefined
```

Map.prototype.has()

方法has() 返回一个bool值，用来表明map 中是否存在指定元素.

```javascript
var myMap = new Map();
myMap.set("bar", "foo");

myMap.has("bar");  // returns true
myMap.has("baz");  // returns false
```

Map.prototype.keys()

keys() 返回一个引用的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object
```

###  Map.prototype.set()

`set()` 方法为 `Map` 对象添加或更新一个指定了键（`key`）和值（`value`）的（新）键值对。

```javascript
var myMap = new Map();

// 将一个新元素添加到 Map 对象
myMap.set("bar", "foo");
myMap.set(1, "foobar");

// 在Map对象中更新某个元素的值
myMap.set("bar", "baz");

//链式使用 set 方法
myMap.set('bar', 'foo').set(1, 'foobar').set(2, 'baz');
```

Map.prototype.values()

values() 方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.values();

console.log(mapIter.next().value); // "foo"
console.log(mapIter.next().value); // "bar"
console.log(mapIter.next().value); // "baz"
```

## 9.Object

### Object.prototype.constructor

返回创建实例对象的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。对原始类型来说，如`1`，`true`和`"test"`，该值只可读。

```javascript
所有对象都会从它的原型上继承一个 constructor 属性：
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true
```

### Object.assign()

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

```javascript
Object.assign(target, ...sources)

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target);// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);// expected output: Object { a: 1, b: 4, c: 5 }

```

针对深拷贝，需要使用其他办法，因为 `Object.assign()`拷贝的是（可枚举）属性值。

假如源值是一个对象的引用，它仅仅会复制其引用值。

```javascript
let obj1 = { a: 0 , b: { c: 0}};
let obj2 = Object.assign({}, obj1);

log(JSON.stringify(obj2));  	//{ a: 0, b: { c: 0}}
obj1.a = 1;
log(JSON.stringify(obj1));		// { a: 1, b: { c: 0}}
log(JSON.stringify(obj2));		// { a: 0, b: { c: 0}}

obj2.b.c = 3;
log(JSON.stringify(obj1)); 		// { a: 1, b: { c: 3}}
log(JSON.stringify(obj2));		// { a: 2, b: { c: 3}}

let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
log(JSON.stringify(obj3));		// { a: 0, b: { c: 0}}
```

## 10.Set

**`Set`** 对象允许你存储任何类型的唯一值，无论是[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)或者是对象引用。

### Set.prototype[@@iterator]()

`@@iterator` 属性的初始值和 [`values`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/values) 属性的初始值是同一个函数。

```javascript
const mySet = new Set();
mySet.add('0');
mySet.add(1);
mySet.add({});

const setIter = mySet[Symbol.iterator]();

console.log(setIter.next().value); // "0"
console.log(setIter.next().value); // 1
console.log(setIter.next().value); // Object
```

### Set.prototype.add()

`add()` 方法用来向一个 `Set` 对象的末尾添加一个指定的值。

```javascript
mySet.add(value);

var mySet = new Set();

mySet.add(1);
mySet.add(5).add("some text"); // 可以链式调用

console.log(mySet);// Set [1, 5, "some text"]
mySet.add(5).add(1);

console.log(mySet);// Set [1, 5, "some text"]  // 重复的值没有被添加进去
```

### Set.prototype.clear()

`clear()` 方法用来清空一个 `Set` 对象中的所有元素。

```javascript
var mySet = new Set();
mySet.add(1);
mySet.add("foo");

mySet.size;       // 2
mySet.has("foo"); // true

mySet.clear();

mySet.size;       // 0
mySet.has("bar")  // false
```

### Set.prototype.delete()

`delete()` 方法可以从一个 `Set` 对象中删除指定的元素。

```javascript
var mySet = new Set();
mySet.add("foo");

mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
mySet.delete("foo"); // 返回 true，删除成功

mySet.has("foo");    // 返回 false，"foo" 已经成功删除
```

### Set.prototype.entries()

entries() 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。

```javascript
var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```

### Set.prototype.has()

**has()** 方法返回一个布尔值来指示对应的值value是否存在Set对象中。

```javascript
var mySet = new Set();
mySet.add('foo');

mySet.has('foo');  // 返回 true
mySet.has('bar');  // 返回 false

var set1 = new Set();
var obj1 = {'key1': 1};
set1.add(obj1);

set1.has(obj1);        // 返回 true
set1.has({'key1': 1}); // 会返回 false，因为其是另一个对象的引用
set1.add({'key1': 1}); // 现在 set1 中有2条（不同引用的）对象了
```

## 11.Math

**`Math`** 是一个内置对象，它拥有一些数学常数属性和数学函数方法。`Math` 不是一个函数对象。

`Math` 用于 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 类型。它不支持 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

### Math.PI

`Math.PI` 表示一个圆的周长与直径的比例，约为 3.14159：

### Math.abs()

`Math.abs(x)` 函数返回指定数字 “x“ 的绝对值。

```javascript
Math.abs('-1');     // 1
Math.abs(-2);       // 2
Math.abs(null);     // 0
Math.abs("string"); // NaN
Math.abs();         // NaN
```

### Math.ceil()

**`Math.ceil()`** 函数返回大于或等于一个给定数字的最小整数。

```javascript
console.log(Math.ceil(.95));	// expected output: 1
console.log(Math.ceil(4));		// expected output: 4
console.log(Math.ceil(7.004));	// expected output: 8
console.log(Math.ceil(-7.004));	// expected output: -7
```

### Math.floor()

`Math.floor()` 返回小于或等于一个给定数字的最大整数。

```javascript
Math.floor( 45.95);		// 45
Math.floor( 45.05);		// 45
Math.floor( 4 );		// 4
Math.floor(-45.05)		// -46
Math.floor(-45.95);		// -46
```

### Math.fround()

**`Math.fround()`** 可以将任意的数字转换为离它最近的[单精度浮点数](https://en.wikipedia.org/wiki/Single-precision_floating-point_format)形式的数字。

```javascript
Math.fround(1.5); // 1.5
Math.fround(1.5) === 1.5; // true

Math.fround(1.337); // 1.3370000123977661
Math.fround(1.337) === 1.337; // false

Math.fround('abc'); // NaN
Math.fround(NaN); // NaN

0.1 + 0.2 == 0.3;    //false
function equal(v1, v2) {
    return Math.fround(v1) == Math.fround(v2);
}
equal(0.1 + 0.2, 0.3);   //true
```

### Math.max()

`Math.max()` 函数返回一组数中的最大值。

```javascript
Math.max(value1[,value2, ...]) 
console.log(Math.max(1, 3, 2));		// expected output: 3
console.log(Math.max(-1, -3, -2));		// expected output: -1
const array1 = [1, 3, 2];
console.log(Math.max(...array1));		// expected output: 3
```

### Math.min()

`Math.min()` 返回零个或更多个数值的最小值。

```javascript
var x = 10, y = -20;
var z = Math.min(x, y);  // -20
```

### Math.pow()

`Math.pow()` 函数返回基数（`base`）的指数（`exponent`）次幂，即 `baseexponent`。

```javascript
console.log(Math.pow(7, 3));
// expected output: 343

console.log(Math.pow(4, 0.5));
// expected output: 2

console.log(Math.pow(7, -2));
// expected output: 0.02040816326530612
//                  (1/49)

console.log(Math.pow(-7, 0.5));
// expected output: NaN
```

### Math.random()

`Math.random()` 函数返回一个浮点数,  伪随机数在范围从**0到**小于**1**，也就是说，从0（包括0）往上，但是不包括1（排除1），然后您可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。

```javascript
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

console.log(getRandomInt(1));
// expected output: 0

console.log(Math.random());
// expected output: a number from 0 to <1

```

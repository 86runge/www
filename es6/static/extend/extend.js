// es6 扩展

// 1.声明变量 var let const

// 2.解构赋值

// 2.1.数组的解构赋值
let [a, b, c] = [1, 2, 3];
// 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
// 如果解构不成功，变量的值就等于undefined。
// 解构赋值允许指定默认值。
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

// 2.2.对象的结构赋值
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
// 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

// 2.3.字符串的结构赋值
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let { length: len } = 'hello';
len // 5

// 2.4.数值和布尔值的解构赋值
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let { toString: s } = 123;
s === Number.prototype.toString // true
let { toString: s } = true;
s === Boolean.prototype.toString // true
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

// 2.6.用途
    // (1).交换变量
    // [x, y] = [y, x];
    // (2).函数返回多个值
    // 返回一个数组
    function example() {
        return [1, 2, 3];
    }
    let [a, b, c] = example();
    // 返回一个对象
    function example() {
        return {
            foo: 1,
            bar: 2
        };
    }
    let { foo, bar } = example();
    // (3).提取 JSON 数据
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };
    let { id, status, data: number } = jsonData;
    console.log(id, status, number);
    // 42, "OK", [867, 5309]
    // (4).函数参数的默认值
    jQuery.ajax = function(url, {
        async = true,
        beforeSend = function() {},
        cache = true,
        complete = function() {},
        crossDomain = false,
        global = true,
        // ... more config
    }) {
        // ... do stuff
    };
    // (5).输入模块的制定方法
    const { SourceMapConsumer, SourceNode } = require("source-map");

// 3.函数的扩展

    // 3.1.指定函数变量的默认值
    // 参数变量是默认声明的，所以不能用let或const再次声明。
    // 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
    // 也就是说，指定了默认值后，length属性将失真。
    // 调用有默认参数的函数时，如果传入undefined ，将触发该参数等于默认值， null 则没有这个效果。

    // 3.2.扩展运算符
    // 扩展运算符（spread）是三个点（ ... ），将一个数组转为用逗号分隔的参数序列。

    // 3.3.严格模式
    // ES6规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不
    // 能显式设定为严格模式，否则会报错。

    // 3.4.name 属性
    // 函数的name 属性，返回该函数的函数名。

    // 3.5.箭头函数
    // var f = v => v;
    // 上面的箭头函数等同于：
    // var f = function(v) {
    //     return v;
    // };
    // 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
    // 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return 语句返回。
    // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
    // 箭头函数有几个使用注意点。
    // （1）函数体内的this 对象，就是定义时所在的对象，而不是使用时所在的对象。
    // （2）不可以当作构造函数，也就是说，不可以使用new 命令，否则会抛出一个错误。
    // （3）不可以使用arguments 对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
    // （4）不可以使用yield 命令，因此箭头函数不能用作Generator函数。
    // 上面四点中，第一点尤其值得注意。this 对象的指向是可变的，但是在箭头函数中，它是固定的。

    // 3.6.尾调用
    // 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
    // return fn(n);
    // ES6的尾调用优化只在严格模式下开启，正常模式是无效的。

// 4.数组的扩展

    // 4.1.Array.form()
    // Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包
    // 括ES6新增的数据结构Set和Map）。

    // 4.2.Array.of()
    // Array.of 方法用于将一组值，转换为数组。

    // 4.3.copyWithin()
    // 数组实例的copyWithin 方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
    // 也就是说，使用这个方法，会修改当前数组。
    // Array.prototype.copyWithin(target, start = 0, end = this.length)
    // target（必需）：从该位置开始替换数据。
    // start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    // end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

    // 4.4.find()和findIndex()
    // 数组实例的find 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，
    // 直到找出第一个返回值为true 的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined 。

    // 4.5.fill()
    // fill 方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
    // fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

    // 4.6.entries()，keys()和values()
    // ES6提供三个新的方法——entries() ， keys() 和values()——用于遍历数组。它们都返回一个遍历器对象（详见
    // 《Iterator》一章），可以用for...of 循环进行遍历，唯一的区别是keys() 是对键名的遍历、values() 是对键值的遍
    // 历， entries() 是对键值对的遍历。

    // 4.7.数组的空位
    // ES6则是明确将空位转为undefined 。

// 5.对象的扩展

// 6.Symbol
// Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、
// 布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
// Symbol值通过Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，
// 一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，
// 就都是独一无二的，可以保证不会与其他属性名产生冲突。
// Symbol值不能与其他类型的值进行运算，会报错。
// 但是，Symbol值可以显式转为字符串。
// 另外，Symbol值也可以转为布尔值，但是不能转为数值。

// 7.Set和Map
// Set 类似于数组，成员唯一
// Map 类似对象，键值对的集合，键的类型多样
// Object 键只能是字符串

// Set结构的实例有以下属性。
    // Set.prototype.constructor ：构造函数，默认就是Set 函数。
    // Set.prototype.size ：返回Set 实例的成员总数。
// Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
    // add(value) ：添加某个值，返回Set结构本身。
    // delete(value) ：删除某个值，返回一个布尔值，表示删除是否成功。
    // has(value) ：返回一个布尔值，表示该值是否为Set 的成员。
    // clear() ：清除所有成员，没有返回值。
// Array.from 方法可以将Set结构转为数组。
// 遍历操作
// Set结构的实例有四个遍历方法，可以用于遍历成员。
    // keys() ：返回键名的遍历器
    // values() ：返回键值的遍历器
    // entries() ：返回键值对的遍历器
    // forEach() ：使用回调函数遍历每个成员
// 需要特别指出的是， Set 的遍历顺序就是插入顺序。

// Map结构的实例有以下属性和操作方法。
    // size 属性返回Map结构的成员总数。     
    // set 方法设置key 所对应的键值，然后返回整个Map结构。如果key 已经有值，则键值会被更新，
    // 否则就新生成该键。set 方法返回的是Map本身，因此可以采用链式写法。
    // get 方法读取key 对应的键值，如果找不到key ，返回undefined 。
    // has 方法返回一个布尔值，表示某个键是否在Map数据结构中。
    // delete 方法删除某个键，返回true。如果删除失败，返回false。
    // clear 方法清除所有成员，没有返回值。
// Map原生提供三个遍历器生成函数和一个遍历方法。
    // keys() ：返回键名的遍历器。
    // values() ：返回键值的遍历器。
    // entries() ：返回所有成员的遍历器。
    // forEach() ：遍历Map的所有成员。
// 需要特别注意的是，Map的遍历顺序就是插入顺序。
// Map转为数组最方便的方法，就是使用扩展运算符（...）。[...myMap]
// 将数组转入Map构造函数，就可以转为Map。new Map([[true, 7], [{foo: 3}, ['abc']]])
// 如果所有Map的键都是字符串，它可以转为对象。strMapToObj(myMap)
// 对象转为Map。objToStrMap({yes: true, no: false})
// JSON转为Map。

// 8.Proxy和Reflect
// var proxy = new Proxy(target, handler);
// Proxy 对象的所有用法，都是上面这种形式，不同的只是handler 参数的写法。其中， 
// new Proxy() 表示生成一个Proxy 实例， target 参数表示所要拦截的目标对象， 
// handler 参数也是一个对象，用来定制拦截行为。

// 9.Promise对象

// 10.Iterator和for...of循环
// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部
// 署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
// Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序
// 排列；三是ES6创造了一种新的遍历命令for...of 循环，Iterator接口主要供for...of 消费。

// Iterator的遍历过程是这样的。
// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
// （2）第一次调用指针对象的next 方法，可以将指针指向数据结构的第一个成员。
// （3）第二次调用指针对象的next 方法，指针就指向数据结构的第二个成员。
// （4）不断调用指针对象的next 方法，直到它指向数据结构的结束位置。
// 每一次调用next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value 和done 两个属性的对象。其
// 中， value 属性是当前成员的值， done 属性是一个布尔值，表示遍历是否结束。

// ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator 属性，或者说，一个数据结构只要具有Symbol.iterator 属
// 性，就可以认为是“可遍历的”（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函
// 数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator ，它是一个表达式，返回Symbol 对象的iterator 属
// 性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内。

// 在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
// for...of 循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments 对象、DOM NodeList 对
// 象）、后文的 Generator 对象，以及字符串。

// for...in 循环读取键名， for...of 循环读取键值。如果要通过for...of 循环，获取数组的索引，可以借助数组
// 实例的entries 方法和keys 方法
// for 循环
// for...in 循环主要是为遍历对象而设计的，不适用于遍历数组。
// for...of 没有for...in 的缺点
// forEach 无法使用break,continue和return 适合数组遍历
// map 数组方法，映射生成新数组
// $.each 和 forEach 一样

// 11.Generator 函数的语法
// Generator 函数是一个普通函数，但是有两个特征。一是， function 关键字与函数名之间有一个星号；二是，函数体
// 内部使用yield 语句，定义不同的内部状态（ yield 在英语里的意思就是“产出”）。
// 总结一下，调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象
// 的next 方法，就会返回一个有着value 和done 两个属性的对象。value 属性表示当前的内部状态的值，是yield 语句后面那个
// 表达式的值； done 属性是一个布尔值，表示是否遍历结束。

// 由于Generator函数返回的遍历器对象，只有调用next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函
// 数。yield 语句就是暂停标志。
// 遍历器对象的next 方法的运行逻辑如下。
// （1）遇到yield 语句，就暂停执行后面的操作，并将紧跟在yield 后面的那个表达式的值，作为返回的对象的value 属性值。
// （2）下一次调用next 方法时，再继续往下执行，直到遇到下一个yield 语句。
// （3）如果没有再遇到新的yield 语句，就一直运行到函数结束，直到return 语句为止，并将return 语句后面的表达式的值，
// 作为返回的对象的value 属性值。
// （4）如果该函数没有return 语句，则返回的对象的value 属性值为undefined 。
// 需要注意的是， yield 语句后面的表达式，只有当调用next 方法、内部指针指向该语句时才会执行，因此等于为JavaScript提
// 供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
    // function* helloWorldGenerator() {
    // yield 'hello';
    // yield 'world';
    // return 'ending';
    // }
    // var hw = helloWorldGenerator();
    // hw.next()
    // // { value: 'hello', done: false }
    // hw.next()
    // // { value: 'world', done: false }
    // hw.next()
    // // { value: 'ending', done: true }
    // hw.next()
    // // { value: undefined, done: true }

// 12.async 函数
// async 函数就是将 Generator 函数的星号（ * ）替换成async ，将yield 替换成await
// async 函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
// Generator 函数的执行必须靠执行器，所以才有了co 模块，而async 函数自带执行器。也就是说， async 函数的执行，与普通
// 函数一模一样，只要一行。
// （2）更好的语义。
// async 和await ，比起星号和yield ，语义更清楚了。async 表示函数里有异步操作， await 表示紧跟在后面的表达式需要等待
// 结果。
// （3）更广的适用性。
// co 模块约定， yield 命令后面只能是 Thunk 函数或 Promise 对象，而async 函数的await 命令后面，可以是Promise 对象和
// 原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
// （4）返回值是 Promise。
// async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then 方法指定下
// 一步的操作。
// 进一步说， async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await 命令就是内部then 命令的语法糖。

// async 函数返回一个 Promise 对象，可以使用then 方法添加回调函数。当函数执行的时候，一旦遇到await 就会先返回，等到
// 异步操作完成，再接着执行函数体内后面的语句。

// 13.Class 类
// 类的数据类型就是函数，类本身就指向构造函数，也是直接对类使用new 命令，跟构造函数的用法完全一致。
// constructor 方法是类的默认方法，通过new 命令生成对象实例时，自动调用该方法。一个类必须有constructor 方法，如果没
// 有显式定义，一个空的constructor 方法会被默认添加。
// 与函数一样，类也可以使用表达式的形式定义。const MyClass = class Me {}。这个类的名字是MyClass 而不是Me
// 子类的__proto__ 属性，表示构造函数的继承，总是指向父类。
// 子类prototype 属性的__proto__ 属性，表示方法的继承，总是指向父类的prototype 属性。

// 14.修饰器

// 15.Module 的语法
// ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict"; 。
// 严格模式主要有以下限制。
    // 变量必须声明后再使用
    // 函数的参数不能有同名属性，否则报错
    // 不能使用with 语句
    // 不能对只读属性赋值，否则报错
    // 不能使用前缀0表示八进制数，否则报错
    // 不能删除不可删除的属性，否则报错
    // 不能删除变量delete prop ，会报错，只能删除属性delete global[prop]
    // eval 不会在它的外层作用域引入变量
    // eval 和arguments 不能被重新赋值
    // arguments 不会自动反映函数参数的变化
    // 不能使用arguments.callee
    // 不能使用arguments.caller
    // 禁止this 指向全局对象
    // 不能使用fn.caller 和fn.arguments 获取函数调用的堆栈
    // 增加了保留字（比如protected 、static 和interface ）

// export 和 import
// export 命令用于规定模块的对外接口， import 命令用于输入其他模块提供的功能。
// export * 整体打包模块 import * 整体导入
// export default 命令，定义匿名模块
// 其他模块加载该模块时， import 命令可以为该匿名函数指定任意名字。

// 模块加载
// 浏览器加载 ES6 模块，也使用<script> 标签，但是要加入type="module" 属性。
// 浏览器对于带有type="module" 的<script> ，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，
// 等同于打开了<script> 标签的defer 属性。
// ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

// Node 加载
// 在静态分析阶段，一个模块脚本只要有一行import 或export 语句，Node 就会认为该脚本为 ES6 模块，否则就为
// CommonJS 模块。如果不输出任何接口，但是希望被 Node 认为是 ES6 模块，可以在脚本中加一行语句。
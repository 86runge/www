var events = require('events');

//定义一个行人的类型
var People = function () {
    //构造函数里 new 了一个 EventEmitter 事件发射器 实例.
    this.emitter = new events.EventEmitter(this);
}
//为此类型定义一个绑定事件的方法
People.prototype.on = function (light, callback) {
    this.emitter.on(light, callback);
}
//为此类型定义一个事件发射器(注册一个事件)
People.prototype.crossRoad = function (light) {
    this.emitter.emit("crossRoad", light);
}

//定义一个机动车的类型
var Car = function () {
    this.emitter = new events.EventEmitter(this);
}
//时间绑定方法
Car.prototype.on = function (light, callback) {
    this.emitter.on(light, callback);
}
//定义一个事件发射器(注册一个事件)
Car.prototype.crossRoad = function (light) {
    this.emitter.emit("crossRoad", light);
}
//创建一个行人
var people = new People();
people.on("crossRoad", function (light) {
    console.log(light + '亮起,行人准备通过...');
})

//创建一个机动车
var car = new Car();
car.on("crossRoad", function (light) {
    console.log(light + '亮起,车辆准备通过...');
})

console.log('焦急地等待红灯中......');
setTimeout(function () {
    var light = '绿灯';
    console.log(light + '突然亮起....');
    people.crossRoad(light);//触发事件
    car.crossRoad(light);   //触发事件
}, 3000);
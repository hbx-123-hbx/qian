// import {a as b,Person} from "./export"
// console.log(b);
// let p1 = new Person("小a");
// p1.Sleep();

// import p from "./export"
// let p1 = new p("小a");
// p1.Sleep();

import { a as aaa, fn1 } from './export';
console.log(aaa);

console.log(fn1());

import Person1 from './export'

let p1 = new Person1('wangwu');
p1.sleep();

// export let a = "hello";
// export class Person{
//   constructor(name){
//     this.name = name
//   }
//   Sleep(){
//     console.log(this.name + 'sleeeping')
//   }
// }

// class Person{
//     constructor(name){
//       this.name = name
//     }
//     Sleep(){
//       console.log(this.name + 'sleeeping')
//     }
// }

// export default Person



let a = 666;
let fn1 = () => 'hello';
export { a, fn1 }

class Person {
  constructor(name) {
    this.name = name
  }
  sleep() {
    console.log(this.name + ' is sleeping');
  }
}

export default Person
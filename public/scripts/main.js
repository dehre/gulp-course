class Person {
  constructor(name){
    this.name=name;
  }
  hello(){
    if(typeof this.name == 'string'){
      return ('Hello ' + this.name + '!');
    }
  }
}

var name = 'sig Luca Tonyy';
document.write('Hello ' + name + '!');

console.log('START CREATING NEW PERSON');
console.log('.........................');
var person = new Person('Maximilian');
var greetTemplate = templates['greeting']({
  message: person.hello()
});
document.write(greetTemplate);
console.log('.................');
console.log('HELLO METHOD USED');

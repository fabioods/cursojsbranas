const Person = function (name, city, year) {
  this.name = name;
  this.city = city;
  this.year = year;
  this.age = this.getAge();
};

Person.prototype.getAge = function () {
  return new Date().getFullYear() - this.year;
};

const person1 = new Person("Linus Torvalds", "Helsinky", 1969);
const person2 = new Person("Bill Gates", "Seattle", 1955);

console.log(person1);
console.log(person1.age);
console.log(person2);
console.log(person2.getAge());

const _new = (fn, ...params) => {
  const obj = {};
  Object.setPrototypeOf(obj, fn.prototype);
  fn.apply(obj, params);
  return obj;
};
const p1 = _new(Person, "Linus Torvalds", "Helsinky", 1969);
console.log(p1, p1.getAge());

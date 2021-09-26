const array = [10, 10, 10];
const obj = {};
array.forEach(function (element) {
    obj[element] = undefined;
});
const set = Object.keys(obj);
console.log(set);

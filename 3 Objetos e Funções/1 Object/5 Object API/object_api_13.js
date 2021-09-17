const javascript = {};
Object.defineProperty(javascript, "name", {
    enumerable: true,
    value: "JavaScript",
    writable: true
});
javascript.name = "ECMAScript";
delete javascript.name;
console.log(javascript);
console.log(Object.keys(javascript));
console.log(Object.values(javascript));
console.log(Object.entries(javascript));

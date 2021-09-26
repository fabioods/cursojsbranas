const map = new Map();
map.set(10, "Number");
map.set("10", "String");
map.set(true, "Boolean");
map.set("true", "String");
console.log(map.get(10));
console.log(map.get('10'));
console.log(map.get(true));
console.log(map.get("true"));

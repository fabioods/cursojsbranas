function sum(a, b) {
    return new Promise(function (resolve) {
        setTimeout(function() {
            resolve(a + b);
        }, 1000);
    });
}
const a = sum(2, 2);
const b = sum(4, 4)
const result = sum(a, b);
console.log(result);

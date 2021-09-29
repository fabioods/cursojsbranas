function delayedSum(a, b) {
    setTimeout(function() {
        return a + b;
    }, 1000);
}
const result = delayedSum(2, 2);
console.log(result);

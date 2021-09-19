let sum = function(...numbers, a, b, c) {
    let total = a + b + c;
    for(let number of numbers) {
        total += number;
    }
    return total;
};
console.log(sum(1,2,3,4,5,6,7,8,9));

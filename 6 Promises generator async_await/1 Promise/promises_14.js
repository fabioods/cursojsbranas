function delayedSum(a, b) {
  return new Promise(function (resolve, reject) {
    if (!a || !b) return reject("Invalid input");
    setTimeout(function () {
      resolve(a + b);
    }, 1000);
  });
}
console.time("performance");
Promise.all([delayedSum(2, 2), delayedSum(4, 4)])
  .then(function (values) {
    console.log(values);
    console.timeEnd("performance");
  })
  .catch(function (e) {
    console.log(e);
  });

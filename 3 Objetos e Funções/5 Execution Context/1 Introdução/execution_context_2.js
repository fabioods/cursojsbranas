const v1 = 10;
const fn1 = function() {
    const fn2 = function() {
        console.log(v1);
    }
    fn2();
};
fn1();

const obj1 = {
    p1: 10,
    getP1: function() {
        const that = this;
        function fn1() {
            return that.p1;
        }
        return fn1();
    }
};
console.log(obj1.getP1());

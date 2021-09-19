const rectangle = {};
Object.defineProperty(rectangle, "area", {
  get() {
    return this._x * this._y;
  },
});
Object.defineProperty(rectangle, "x", {
  set(x) {
    this._x = x;
  },
});
Object.defineProperty(rectangle, "y", {
  set(y) {
    this._y = y;
  },
});
rectangle.x = 10;
rectangle.y = 2;
console.log(rectangle.area);
console.log(rectangle._x);
console.log(rectangle._y);

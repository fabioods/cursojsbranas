const areas = new WeakMap();
const rectangle1 = {
    x: 10,
    y: 2
};
const rectangle2 = {
    x: 5,
    y: 3
};
function calculateArea(rectangle) {
    const area = rectangle.x * rectangle.y;
    if (areas.has(rectangle)) {
        console.log("Using cache");
        return areas.get(rectangle);
    }
    areas.set(rectangle, area);
    return area;
}
console.log(calculateArea(rectangle1));
console.log(calculateArea(rectangle1));
console.log(calculateArea(rectangle2));

class Shape {
}

class Square extends Shape {
    constructor(side) {
        this.side = side;
    }
    
    calculateArea() {
        return Math.pow(this.side, 2);
    }

    toString() {
        return `side: ${this.side} area: ${this.calculateArea()}`;
    }

    static fromArea(area) {
        return new Square(Math.sqrt(area));
    }
}
const square = Square.fromArea(16);
console.log(square.toString());

class Circle extends Shape {
    constructor(radius) {
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    toString() {
        return `radius: ${this.radius} area: ${this.calculateArea()}`;
    }

    static fromArea(area) {
        return new Circle(Math.ceil(Math.sqrt(area / Math.PI)));
    }
}
const circle = Circle.fromArea(314.159265);
console.log(circle.toString());

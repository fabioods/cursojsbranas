class Square {
    constructor(side) {
        this.side = side;
    }

    calculateArea() {
        return Math.pow(this.side, 2);
    }
    
    toString() {
        return `side: ${this.side} area: ${this.calculateArea()}`;
    }
}
const square = new Square(4);
console.log(square.toString());

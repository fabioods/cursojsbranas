const book1 = {
    name: "Refactoring",
    author: "Martin Fowler"
};
const book2 = {
    name: "Refactoring",
    author: "Martin Fowler"
};
const book3 = JSON.parse(JSON.stringify(book2));
console.log(book2 === book3);

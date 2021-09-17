const book = {
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    language: "English",
    available: true
};
book.available = null;
console.log(book);
console.log("available" in book);

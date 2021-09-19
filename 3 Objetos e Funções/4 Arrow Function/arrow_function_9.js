const createPerson = function(name, city, year) {
    return {
        name,
        city,
        year
    };
};
const person = createPerson("Alan Kay", "Springfield", 1940);
console.log(person);

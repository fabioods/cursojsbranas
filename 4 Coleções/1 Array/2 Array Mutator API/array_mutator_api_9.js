const languages = [
    {
        name: "Python",
        year: 1991
    }, 
    {
        name: "C",
        year: 1972
    },
    {
        name: "Java",
        year: 1995
    }
];
languages.sort(function (a, b) {
    return (a.name > b.name) ? -1 : 1;
});
console.log(languages);

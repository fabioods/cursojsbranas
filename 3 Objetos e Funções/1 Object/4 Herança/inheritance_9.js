const functionalLanguage = Object.create({});
functionalLanguage.paradigm = "Functional";
const scheme = Object.create(functionalLanguage);
scheme.name = "Scheme";
scheme.year = 1975;
const javascript = Object.create(functionalLanguage);
javascript.name = "JavaScript";
javascript.year = 1995;
javascript.paradigm = "OO";
for (let key in javascript) {
    console.log(key, javascript[key]);
}

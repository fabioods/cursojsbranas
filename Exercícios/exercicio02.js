const sql =
  "create table author (id number, name string, age number, city string, state string, country string)";

const [_, tableName, columns] = sql.match(/create table (\w+) \((.+)\)/);
console.log(tableName, columns);

const database = {
  tables: {},
};
database.tables[tableName] = {
  columns: {},
  data: [],
};
for (const column of columns.trim().split(", ")) {
  const [name, type] = column.split(" ");
  database.tables[tableName].columns[name] = type;
}

console.log(JSON.stringify(database, null, 2));

const DatabaseError = function (statement, message) {
  this.message = message;
  this.statement = statement;
  this.error = `${this.message} '${this.statement}'`;
};

const database = {
  tables: {},
  createTable(tableName, columns) {
    this.tables[tableName] = {
      columns: {},
      data: [],
    };
    for (const column of columns.trim().split(", ")) {
      const [name, type] = column.split(" ");
      database.tables[tableName].columns[name] = type;
    }
    return this;
  },

  execute(sql) {
    if (String.prototype.trim.call(sql).startsWith("create table")) {
      const [_, tableName, columns] = sql.match(/create table (\w+) \((.+)\)/);
      return this.createTable(tableName, columns);
    }
    throw new DatabaseError(sql, "Syntax error:");
  },
};

const createSQL =
  "create table author (id number, name string, age number, city string, state string, country string)";
const selectSQL = "select id, name from author";

try {
  console.log(JSON.stringify(database.execute(createSQL), null, 2));
  console.log(JSON.stringify(database.execute(selectSQL), null, 2));
} catch (error) {
  console.log(error.error);
}

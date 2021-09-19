const sql =
  "create table author (id number, name string, age number, city string, state string, country string)";

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
  },
};

console.log(JSON.stringify(database.execute(sql), null, 2));

const DatabaseError = function (statement, message) {
  this.message = message;
  this.statement = statement;
  this.error = `${this.message} '${this.statement}'`;
};

const validate = (sql, command) => {
  return String.prototype.trim.call(sql).startsWith(command);
};

const selectColumns = (rows, fields) => {
  return rows.map((row) => {
    const columns = fields.split(", ");
    let newRow = {};
    columns.forEach((column) => {
      newRow[column] = row[column];
    });
    return newRow;
  });
};

const database = {
  tables: {},
  createTable(sql) {
    const [_, tableName, columns] = sql.match(/create table (\w+) \((.+)\)/);
    this.tables[tableName] = {
      columns: {},
      data: [],
    };
    for (const column of columns.trim().split(", ")) {
      const [name, type] = column.split(" ");
      this.tables[tableName].columns[name] = type;
    }
    return this;
  },
  execute(sql) {
    if (validate(sql, "create table")) return this.createTable(sql);
    else if (validate(sql, "insert into")) return this.insert(sql);
    else if (validate(sql, "select")) return this.select(sql);
    throw new DatabaseError(sql, "Syntax error:");
  },
  insert(sql) {
    const [_, tableName, columns, values] = sql.match(
      /insert into (\w+) \((.+)\) values \((.+)\)/
    );
    const row = {};
    columns.split(", ").forEach((column, index) => {
      row[column] = values.split(", ")[index];
    });
    this.tables[tableName].data.push(row);
    return this;
  },
  select(sql) {
    const [_, fields, tableName, __, whereValues] = sql.match(
      /select (.+) from (\w+)( where (.+))?/
    );
    const rows = this.tables[tableName].data;
    if (whereValues) {
      const filteredRows = rows.filter((row) => {
        const [columnWhere, valueWhere] = whereValues.split(" = ");
        return row[columnWhere] === valueWhere;
      });
      return selectColumns(filteredRows, fields);
    }
    return selectColumns(rows, fields);
  },
};

const createSQL =
  "create table author (id number, name string, age number, city string, state string, country string)";
const insert01 =
  "insert into author (id, name, age) values (1, Douglas Crockford, 62)";
const insert02 =
  "insert into author (id, name, age) values (2, Linus Torvalds, 47)";
const insert03 =
  "insert into author (id, name, age) values (3, Martin Fowler, 54)";
const select01 = "select name, age from author";
const select02 = "select name, age from author where id = 1";

try {
  console.log(JSON.stringify(database.execute(createSQL), null, 2));
  console.log(JSON.stringify(database.execute(insert01), null, 2));
  console.log(JSON.stringify(database.execute(insert02), null, 2));
  console.log(JSON.stringify(database.execute(insert03), null, 2));
  console.log(JSON.stringify(database.execute(select01), null, 2));
  console.log(JSON.stringify(database.execute(select02), null, 2));
} catch (error) {
  console.log(error.error);
}

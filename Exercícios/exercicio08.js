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

const Parser = function () {
  this.commands = new Map();
  this.commands.set("create", /create table (\w+) \((.+)\)/);
  this.commands.set("delete", /delete from (\w+)(?: where (.+))?/);
  this.commands.set("insert", /insert into (\w+) \((.+)\) values \((.+)\)/);
  this.commands.set("select", /select (.+) from (\w+)( where (.+))?/);
  this.parse = function (statement) {
    for (let [command, value] of this.commands) {
      const parsedStatement = statement.match(value);
      if (parsedStatement) {
        return {
          command,
          parsedStatement,
        };
      }
    }
    return null;
  };
};

const database = {
  tables: {},
  parse: new Parser(),
  create(parsedStatement) {
    const [_, tableName, columns] = parsedStatement;
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
  delete(parsedStatement) {
    const [_, tableName, deleteBy] = parsedStatement;
    const rows = this.tables[tableName].data;
    if (deleteBy) {
      const [column, value] = deleteBy.split(" = ");
      this.tables[tableName].data = rows.filter((row) => {
        return row[column] !== value;
      });
      return this;
    }
    this.tables[tableName].data = [];
    return this;
  },
  execute(sql) {
    const { command, parsedStatement } = this.parse.parse(sql);
    console.log("command", command, parsedStatement);
    if (command) {
      return this[command](parsedStatement);
    }
    throw new DatabaseError(sql, "Syntax error:");
  },
  insert(parsedStatement) {
    const [_, tableName, columns, values] = parsedStatement;
    const row = {};
    columns.split(", ").forEach((column, index) => {
      row[column] = values.split(", ")[index];
    });
    this.tables[tableName].data.push(row);
    return this;
  },
  select(parsedStatement) {
    const [_, fields, tableName, __, whereValues] = parsedStatement;
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
const delete01 = "delete from author where id = 2";
const delete02 = "delete from author";

try {
  console.log(
    "createSQL",
    JSON.stringify(database.execute(createSQL), null, 2)
  );
  console.log("insert01", JSON.stringify(database.execute(insert01), null, 2));
  console.log("insert02", JSON.stringify(database.execute(insert02), null, 2));
  console.log("insert03", JSON.stringify(database.execute(insert03), null, 2));
  console.log("select01", JSON.stringify(database.execute(select01), null, 2));
  console.log("select02", JSON.stringify(database.execute(select02), null, 2));
  console.log("delete01", JSON.stringify(database.execute(delete01), null, 2));
  console.log("delete02", JSON.stringify(database.execute(delete02), null, 2));
} catch (error) {
  console.log(error.error);
}

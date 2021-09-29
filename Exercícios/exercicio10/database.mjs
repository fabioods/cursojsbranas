import { DatabaseError } from "./DatabaseError.mjs";
import { Parser } from "./Parser.mjs";

export class Database {
  constructor() {
    this.tables = {};
    this.parse = new Parser();
  }

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
  }

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
  }

  execute(sql) {
    const { command, parsedStatement } = this.parse.parse(sql);
    if (command) {
      return this[command](parsedStatement);
    }
    throw new DatabaseError(sql, "Syntax error:");
  }

  insert(parsedStatement) {
    const [_, tableName, columns, values] = parsedStatement;
    const row = {};
    columns.split(", ").forEach((column, index) => {
      row[column] = values.split(", ")[index];
    });
    this.tables[tableName].data.push(row);
    return this;
  }

  select(parsedStatement) {
    const [_, fields, tableName, __, whereValues] = parsedStatement;
    const rows = this.tables[tableName].data;
    if (whereValues) {
      const filteredRows = rows.filter((row) => {
        const [columnWhere, valueWhere] = whereValues.split(" = ");
        return row[columnWhere] === valueWhere;
      });
      return this.selectColumns(filteredRows, fields);
    }
    return this.selectColumns(rows, fields);
  }

  selectColumns(rows, fields) {
    return rows.map((row) => {
      const columns = fields.split(", ");
      let newRow = {};
      columns.forEach((column) => {
        newRow[column] = row[column];
      });
      return newRow;
    });
  }
}

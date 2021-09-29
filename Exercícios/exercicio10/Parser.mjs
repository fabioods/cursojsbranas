export class Parser {
  constructor(statement) {
    this.statement = statement;
    this.commands = new Map();
    this.commands.set("create", /create table (\w+) \((.+)\)/);
    this.commands.set("delete", /delete from (\w+)(?: where (.+))?/);
    this.commands.set("insert", /insert into (\w+) \((.+)\) values \((.+)\)/);
    this.commands.set("select", /select (.+) from (\w+)( where (.+))?/);
  }

  parse(statement) {
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
  }
}

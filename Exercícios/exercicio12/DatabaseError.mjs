export class DatabaseError {
  constructor(statement, message) {
    this.message = message;
    this.statement = statement;
    this.error = "${this.message} ${this.statement}";
  }
}

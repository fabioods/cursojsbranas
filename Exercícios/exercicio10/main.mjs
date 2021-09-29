import { Database } from "./database.mjs";

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

let database = new Database();

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

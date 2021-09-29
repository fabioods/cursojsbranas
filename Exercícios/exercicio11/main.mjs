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
  database
    .execute(createSQL)
    .then((values) => {
      console.log(JSON.stringify(values, null, 2));
      Promise.all([
        database.execute(insert01),
        database.execute(insert02),
        database.execute(insert03),
      ]).then((values) => {
        console.log(JSON.stringify(values, null, 2));
        Promise.all([
          database.execute(select01),
          database.execute(select02),
        ]).then((values) => {
          console.log(JSON.stringify(values, null, 2));
          Promise.all([
            database.execute(delete01),
            database.execute(delete02),
          ]).then((values) => {
            console.log(JSON.stringify(values, null, 2));
          });
        });
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
} catch (error) {
  console.log(error.error);
}

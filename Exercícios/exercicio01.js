/**
 *  Objetivo
 *
 * Extraia partes do comando como o nome da tabela e as colunas, armazenando-as em variáveis.
 *
 * Instruções
 *
 * Dado o comando:
 *
 * create table author (id number, name string, age number, city string, state string, country string)
 *
 *
 * Extraia o nome da tabela e armazene em uma variável chamada "tableName".
 * Extraia as colunas da tabela e armazene em uma variável chamada "columns".
 * Manipule a variável "columns", separando cada coluna com seu respectivo tipo, em uma string separada.
 *
 *
 * Resultado
 *
 * tableName = "author"
 * columns = [ 'id number',' name string',' age number',' city string',' state string',' country string']
 *
 * Dicas
 *
 *
 * Explore ao máximo as operações disponíveis na String API como: String.prototype.match, String.prototype.replace e
 * String.prototype.split, juntamente com expressões regulares. A operação String.prototype.split retorna uma array,
 * então não é necessário se preocupar em criar ou adicionar as colunas no array.
 */

const sql =
  "create table author (id number, name string, age number, city string, state string, country string)";
//extrai o nome da tabela
const tableName = sql.match(/create table (\w+)/)[1];
//extrai o nome das colunas no caso onde o nome dos atributos estão entre parenteses
const columnsExtracted = sql.match(/\(.+/)[0];
//remove os parenteses do inicio e do final em todos os casos, por isso o "g" no fim
const replaceParentesis = columnsExtracted.replace(/\(|\)/g, "");
//separa as colunas em um array
const splitColumns = replaceParentesis.split(",");

// console.log(tableName);
// console.log(columnsExtracted);
// console.log(replaceParentesis);
// console.log(splitColumns);
console.log(`tableName = ${tableName}
columns = ${splitColumns}
`);

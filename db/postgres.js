const { Client } = require('pg');

// console.log(process.env.DB_LOCAL_DATABASE);
// console.log(process.env);

const client = new Client({
    user: process.env.PG_LOCAL_USER,
    host: process.env.PG_LOCAL_HOST,
    database: process.env.PG_LOCAL_DATABASE,
    port: process.env.PG_LOCAL_POST
});

client.connect();

// console.log(client);

function query(text) {
    return client.query(text);
}

module.exports = {query}

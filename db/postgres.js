const { Client } = require('pg');

// const client = new Client({
//     user: process.env.PG_LOCAL_USER,
//     host: process.env.PG_LOCAL_HOST,
//     database: process.env.PG_LOCAL_DATABASE,
//     port: process.env.PG_LOCAL_PORT,
// });

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    port: '5432'
});
client.connect();

function query(text) {
    return client.query(text);
}

module.exports = {query}

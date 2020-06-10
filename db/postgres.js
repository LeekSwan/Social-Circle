const { Client } = require('pg');



const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'rabidrabbit',
    port: 5432,
});

client.connect();


function query(text) {
    return client.query(text);
}

module.exports = {query}


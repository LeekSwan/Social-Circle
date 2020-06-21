const { Client } = require('pg');

let client;
if (process.env.NODE_ENV === 'production') {
    console.log("prod: skipping connecting to production DB for now");
} else {
    client = new Client({
        user: process.env.PG_LOCAL_USER,
        host: process.env.PG_LOCAL_HOST,
        database: process.env.PG_LOCAL_DATABASE,
        port: process.env.PG_LOCAL_PORT
    });
    client.connect();
}


function query(text) {
    return client.query(text);
}

module.exports = {query}

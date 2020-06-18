const { Client } = require('pg');

let db_params = {}
if (process.env.NODE_ENV === 'production') {
    db_params = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
} else if (process.env.NODE_ENV === 'dev') {
    db_params = {
        user: process.env.PG_LOCAL_USER,
        host: process.env.PG_LOCAL_HOST,
        database: process.env.PG_LOCAL_DATABASE,
        port: process.env.PG_LOCAL_PORT
    }
} else {
    console.log('Unrecognized NODE_ENV: ', process.env.NODE_ENV);
}

const client = new Client(db_params);
client.connect();

function query(text) {
    return client.query(text);
}

module.exports = {query}

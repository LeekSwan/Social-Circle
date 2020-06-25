const { Client } = require('pg');

function getClient() {
    let db_params = {}
    if (process.env.NODE_ENV === 'production') {
        if ('DATABASE_URL' in process.env) {
            db_params = {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            };
        } else {
            console.log('(prod) process.env.DATABASE_URL does not exist --> skipping db');
            console.log('(prod) If this is a review app, you must manually add the config var in Heroku')
        }
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

    try {
        const client = new Client(db_params);
        client.connect();
        return client;
    } catch (err) {
        console.log('Error when connecting to PG with db_params:');
        console.log(db_params);
        console.log(err.message);
        return null;
    }
}

const client = getClient();

function query(text) {
    return client.query(text);
}

module.exports = {query}

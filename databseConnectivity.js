const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

client.connect();

client.query('SELECT * FROM products', (err, res) => {
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err);
    }
})

async function getProducts() {
    try {
        const result = await client.query('SELECT * FROM products');
        return result.rows;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
    }
}

module.exports = {
    getProducts
};
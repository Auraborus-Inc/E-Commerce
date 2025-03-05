const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'leeqa@Abdullah',
    database: 'E Commerce Practise'
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
    // client
};
const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'leeqa@Abdullah',
    database: 'E Commerce Practise'
})

client.connect();

client.query('SELECT * FROM products WHERE "pPrice" = 500', (err, res) => {
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err);
    }
    client.end();
})
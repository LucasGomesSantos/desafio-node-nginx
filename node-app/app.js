const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const createConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: 'user',
        password: 'userpassword',
        database: 'mydatabase'
    });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const connection = await createConnection();

        const selectQuery = 'SELECT * FROM people';
        const [rows] = await connection.execute(selectQuery);

        await connection.end();

        const listaFormatada = rows.map(row => `${row.id} - ${row.name}`).join('<br>');
        res.send(`<h1>Full Cycle Rocks!</h1><p>${listaFormatada}</p>`);
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        res.send('Erro ao conectar no database');
    }
});

app.post('/', async (req, res) => {
    try {
        const { nome } = req.body;
        const connection = await createConnection();

        const insertQuery = 'INSERT INTO people (name) VALUES (?)';
        await connection.execute(insertQuery, [nome]);

        await connection.end();

        res.send(`Sucess!`);
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        res.send('Erro ao conectar no database');
    }
});

app.listen(3000, () => {
    console.log('Node.js rodando na porta 3000');
});
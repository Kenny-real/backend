const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // Permite que o servidor leia JSON
app.use(cors()); // Permite que o frontend acesse o backend

// Conexão com banco de dados (Ajusta isso para o PostgreSQL da Railway)
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://postgres:PuQosmNGhHEtzPLKUGlAzsTxQYGpIzcc@junction.proxy.rlwy.net:30795/railway'
});

// Rota para cadastrar usuário
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Insere no banco de dados
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        res.status(201).json({ message: 'Usuário cadastrado!', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



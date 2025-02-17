const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Configurar o CORS para permitir apenas teu site na Firebase Hosting
app.use(cors({
    origin: "https://jokestop-4cc4f.web.app", // Permitir requisições apenas desse domínio
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

// Middleware para entender JSON
app.use(express.json());

// Conexão com o PostgreSQL da Railway
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
        console.error("Erro no cadastro:", error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

// Iniciar o servidor (apenas um)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});

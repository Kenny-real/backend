require("dotenv").config(); // Carrega as variáveis do .env

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa a URL do .env
  ssl: { rejectUnauthorized: false }, // Necessário para Railway
});

pool.connect()
  .then(() => console.log("✅ Conectado ao banco de dados!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

module.exports = pool;







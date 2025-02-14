require("dotenv").config();
const pool = require("./database"); // Importa a conexão do banco de dados

// Criação da tabela "users"
const criarTabela = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function inicializarBanco() {
  try {
    await pool.query(criarTabela);
    console.log("✅ Tabela 'users' criada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar tabela:", error);
  } finally {
    pool.end(); // Fecha a conexão com o banco
  }
}

inicializarBanco();

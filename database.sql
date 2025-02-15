CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,         -- Chave primária auto-incrementada
    name VARCHAR(100) NOT NULL,    -- Nome obrigatório
    email VARCHAR(100) UNIQUE NOT NULL,  -- Email único e obrigatório
    password TEXT NOT NULL,        -- Senha (recomenda-se armazenar criptografada)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de criação automática
);

INSERT INTO users (name, email, password)
VALUES ('Teste', 'teste@email.com', '123456');


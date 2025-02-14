const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require("./database");
const upload = require("./upload");


// 📌 Rota de registro de usuário
router.post("/register", async (req, res) => {
    console.log("🚀 Rota /auth/register chamada!");
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    try {
        // Criptografar a senha antes de salvar
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await pool.query(
            "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
            [nome, email, senhaCriptografada]
        );

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// 📌 Rota de login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios!" });
    }

    try {
        // Buscar usuário pelo email
        const resultado = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: "Usuário não encontrado!" });
        }

        const usuario = resultado.rows[0];

        // Comparar a senha enviada com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: "Senha incorreta!" });
        }

        res.json({ message: "Login bem-sucedido!", usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// 📌 Rota para listar todos os usuários (sem mostrar a senha)
router.get("/users", async (req, res) => {
    try {
        const usuarios = await pool.query("SELECT id, nome, email, criado_em FROM users");
        res.json(usuarios.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado!" });
    }
    res.json({ message: "Upload bem-sucedido!", url: req.file.path });
});

module.exports = router;


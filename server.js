const express = require("express");
const app = express();
const authRoutes = require("./authRoutes"); // Importa as rotas de autenticação

app.use(express.json()); // Permite ler JSON no corpo da requisição
app.use("/auth", authRoutes); // Usa as rotas de autenticação

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    const cors = require("cors");
app.use(cors());

});

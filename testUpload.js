const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

async function uploadFile() {
    const formData = new FormData();
    
    formData.append("file", fs.createReadStream("C:/Users/hp/OneDrive/Imagens/Camera Roll/IMG-20241003-WA0014.jpg"));

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Resposta do servidor:", result);
    } catch (error) {
        console.error("Erro ao enviar arquivo:", error);
    }
}

uploadFile();

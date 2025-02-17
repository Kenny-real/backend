from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configurar CORS para aceitar requisições do seu frontend
CORS(app, resources={r"/*": {"origins": "https://jokestop-4cc4f.web.app"}})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("Dados recebidos:", data)
    return jsonify({"message": "Cadastro recebido com sucesso!"}), 200

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa o CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    return jsonify({"message": "Cadastro recebido com sucesso!"}), 200

if __name__ == '__main__':
    app.run(debug=True)

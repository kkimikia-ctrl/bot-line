import os
from flask import Flask, request, jsonify, render_template_string
from tradutor import traduzir

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Tradutor PT-JP</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 50px; background: #f4f4f9; }
        .container { max-width: 600px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        textarea { width: 100%; height: 100px; margin-bottom: 10px; padding: 8px; }
        select, button { padding: 10px; margin-right: 10px; }
        .resultado { margin-top: 20px; background: #e9ecef; padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Tradutor Privado PT-JP</h2>
        <textarea id="texto" placeholder="Digite o texto aqui..."></textarea>
        <br>
        <select id="direcao">
            <option value="pt-ja">Português -> Japonês</option>
            <option value="ja-pt">Japonês -> Português</option>
        </select>
        <button onclick="realizarTraducao()">Traduzir</button>
        
        <div class="resultado" id="blocoResultado" style="display:none;">
            <h3>Tradução:</h3>
            <p id="textoTraduzido"></p>
            <p id="blocoRomaji" style="display:none;"><strong>Romaji:</strong> <span id="textoRomaji"></span></p>
        </div>
    </div>

    <script>
        async function realizarTraducao() {
            const texto = document.getElementById('texto').value;
            const direcao = document.getElementById('direcao').value;
            let de = 'pt', para = 'ja';
            if (direcao === 'ja-pt') { de = 'ja'; para = 'pt'; }

            const resposta = await fetch('/traduzir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: texto, de: de, para: para })
            });

            const dados = await resposta.json();
            document.getElementById('textoTraduzido').innerText = dados.traducao;
            
            const blocoRomaji = document.getElementById('blocoRomaji');
            if (dados.romaji) {
                document.getElementById('textoRomaji').innerText = dados.romaji;
                blocoRomaji.style.display = 'block';
            } else {
                blocoRomaji.style.display = 'none';
            }
            
            document.getElementById('blocoResultado').style.display = 'block';
        }
    </script>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/traduzir', methods=['POST'])
def api_traduzir():
    dados = request.json
    texto = dados.get('texto', '')
    de = dados.get('de', 'pt')
    para = dados.get('para', 'ja')
    
    traducao, romaji = traduzir(texto, de, para)
    return jsonify({'traducao': traducao, 'romaji': romaji})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)

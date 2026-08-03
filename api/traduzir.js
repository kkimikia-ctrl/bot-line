    <script>
        async function traduzirTexto() {
            const texto = document.getElementById('textoInput').value;
            const box = document.getElementById('resultadoBox');

            if (!texto.trim()) {
                alert('Digite algum texto primeiro!');
                return;
            }

            box.style.display = 'block';
            box.innerText = 'Traduzindo...';

            try {
                const resposta = await fetch('/api/traduzir', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ texto })
                });

                const dados = await resposta.json();
                box.innerText = dados.traducao || 'Erro na tradução';
            } catch (e) {
                box.innerText = 'Erro ao conectar com o tradutor.';
            }
        }
    </script>

    

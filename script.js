// 1) Escreve um objeto { rótulo: valor } como linhas de uma tabela
function preencherTabela(id, dados) {
    const tabela = document.getElementById(id);
    tabela.innerHTML = '';
    for (const [rotulo, valor] of Object.entries(dados)) {
        const linha = tabela.insertRow();
        linha.insertCell().textContent = rotulo;
        linha.insertCell().textContent = valor;
    }
}

// 2) Navegador e sistema
function mostrarSistema() {
    preencherTabela('sistema', {
        'Navegador': navigator.userAgent,
        'Idioma': navigator.language,
        'Núcleos de CPU': navigator.hardwareConcurrency,
        'Memória (GB)': navigator.deviceMemory || 'indisponível neste navegador',
        'Fuso horário': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'Online': navigator.onLine ? 'sim' : 'não'
    });
}

// 3) Tela e janela
function mostrarTela() {
    preencherTabela('tela', {
        'Resolução da tela': screen.width + ' x ' + screen.height,
        'Janela do navegador': window.innerWidth + ' x ' + window.innerHeight,
        'Modo escuro': matchMedia('(prefers-color-scheme: dark)').matches ? 'sim' : 'não'
    });
}

mostrarSistema();
mostrarTela();
window.addEventListener('resize', mostrarTela); // atualiza ao redimensionar

// 4) Localização (o navegador pede permissão ao usuário)
document.getElementById('btn-local').addEventListener('click', function() {
    const saida = document.getElementById('local');
    saida.textContent = 'Buscando...';

    navigator.geolocation.getCurrentPosition(
        function(pos) {
            saida.textContent = 'Latitude: ' + pos.coords.latitude.toFixed(4) +
                ', longitude: ' + pos.coords.longitude.toFixed(4);
        },
        function(erro) {
            saida.textContent = 'Não foi possível obter a localização: ' + erro.message;
        }
    );
});

// 5) Arquivos escolhidos pelo usuário
document.getElementById('arquivos').addEventListener('change', function(evento) {
    const dados = {};
    for (const arq of evento.target.files) {
        dados[arq.name] = (arq.size / 1024).toFixed(1) + ' KB';
    }
    preencherTabela('lista-arquivos', dados);
});
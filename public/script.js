// Usuários e senhas
const usuarios = {
    "admin": "admin123",
    "usuario1": "senha1",
    "usuario2": "senha2"
};

// Carregar estoque do Local Storage, ou iniciar com valores padrão
let produtos = JSON.parse(localStorage.getItem("produtos")) || [
    { nome: "Arroz", preco: 20.5, quantidade: 100 },
    { nome: "Feijão", preco: 8.9, quantidade: 50 },
    { nome: "Macarrão", preco: 4.5, quantidade: 200 }
];
let saidas = JSON.parse(localStorage.getItem("saidas")) || [];

// Salvar dados no Local Storage
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("saidas", JSON.stringify(saidas));
}

// Função de login
function validarLogin(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    // Verificar se as credenciais estão corretas
    if (usuarios[usuario] && usuarios[usuario] === senha) {
        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "green";
        // Redirecionar para a página de estoque
        setTimeout(() => {
            window.location.href = "/estoque.html"; // Redireciona para estoque.html
        }, 1000);
    } else {
        mensagem.textContent = "Usuário ou senha incorretos.";
        mensagem.style.color = "red";
    }
}

// Adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    if (nome && quantidade > 0) {
        produtos.push({ nome, preco: 0.0, quantidade });
        salvarDados();
        alert("Produto registrado com sucesso!");
        window.location.href = "ver_estoque.html"; // Redireciona após adicionar
    } else {
        alert("Preencha o nome do produto e uma quantidade válida.");
    }
}

// Remover produto
function removerProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    const produto = produtos.find(p => p.nome === nome);
    if (produto && quantidade > 0 && produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        salvarDados();
        alert("Produto removido com sucesso!");
        window.location.href = "ver_estoque.html"; // Redireciona após remover
    } else {
        alert("Produto não encontrado ou quantidade inválida.");
    }
}

// Registrar saída
function registrarSaida() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    const produto = produtos.find(p => p.nome === nome);
    if (produto && produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        const data = new Date().toLocaleString();
        saidas.push({ nome, quantidade, data });
        salvarDados();
        alert("Saída registrada com sucesso!");
        window.location.href = "ver_estoque.html"; // Redireciona após registrar saída
    } else {
        alert("Quantidade inválida ou produto não encontrado.");
    }
}

// Consultar saídas
function abrirConsultaSaidas() {
    const tabelaSaidas = document.getElementById("tabelaSaidas");
    tabelaSaidas.innerHTML = ""; // Limpar tabela antes de preencher
    saidas.forEach(s => {
        tabelaSaidas.innerHTML += `<tr><td>${s.data}</td><td>${s.nome}</td><td>${s.quantidade}</td></tr>`;
    });
}

// Atualizar lista de produtos ao carregar
window.onload = function() {
    const lista = document.getElementById("listaProdutos");
    if (lista) {
        lista.innerHTML = "";
        produtos.forEach(produto => {
            lista.innerHTML += `<li>${produto.nome} - ${produto.quantidade} unidades</li>`;
        });
    }
};

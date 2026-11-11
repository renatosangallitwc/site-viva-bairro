
let moradores = JSON.parse(localStorage.getItem("moradores")) || [
    {
        nome: "Maria Silva",
        telefone: "(68) 9999-2222",
        endereco: "Rua das Flores, 10",
        email: "maria@gmail.com"
    },
    {
        nome: "João Santos",
        telefone: "(68) 9999-1313",
        endereco: "Rua Nayeon, 10",
        email: "joao@gmail.com"
    }
];

let indiceEdicao = null;

function salvarDados() {
    localStorage.setItem("moradores", JSON.stringify(moradores));
}

function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(function (secao) {
        secao.classList.add("escondida");
    });

    document.getElementById(tela).classList.remove("escondida");

    if (tela === "moradores") {
        listarMoradores();
    }

    atualizarTotal();
}

function atualizarTotal() {
    document.getElementById("totalMoradores").textContent = moradores.length;
    document.getElementById("totalRelatorios").textContent = moradores.length;
}

function listarMoradores() {
    let lista = document.getElementById("listaMoradores");

    lista.innerHTML = "";

    moradores.forEach(function (morador, indice) {
        lista.innerHTML += `
            <div class="morador">
                <h3>${morador.nome}</h3>
                <p>Telefone: ${morador.telefone}</p>
                <p>Endereço: ${morador.endereco}</p>
                <p>E-mail: ${morador.email}</p>

                <div class="acoes">
                    <button class="editar" onclick="editarMorador(${indice})">
                        Editar
                    </button>

                    <button class="excluir" onclick="excluirMorador(${indice})">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    });
}

document.getElementById("formMorador").addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let email = document.getElementById("email").value;

    let novoMorador = {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        email: email
    };

    if (indiceEdicao === null) {
        moradores.push(novoMorador);
        alert("Morador cadastrado com sucesso!");
    } else {
        moradores[indiceEdicao] = novoMorador;
        alert("Cadastro atualizado com sucesso!");
    }

    salvarDados();

    indiceEdicao = null;

    this.reset();

    listarMoradores();
    atualizarTotal();
    mostrarTela("moradores");
});

function editarMorador(indice) {
    let morador = moradores[indice];

    document.getElementById("nome").value = morador.nome;
    document.getElementById("telefone").value = morador.telefone;
    document.getElementById("endereco").value = morador.endereco;
    document.getElementById("email").value = morador.email;

    indiceEdicao = indice;

    document.querySelector(".botao-cadastrar").textContent = "Salvar alterações";

    mostrarTela("cadastro");
}

function excluirMorador(indice) {
    let confirmar = confirm("Deseja realmente excluir este morador?");

    if (confirmar) {
        moradores.splice(indice, 1);

        salvarDados();
        listarMoradores();
        atualizarTotal();

        alert("Morador excluído com sucesso!");
    }
}

document.getElementById("formMorador").addEventListener("reset", function () {
    indiceEdicao = null;
    document.querySelector(".botao-cadastrar").textContent = "Cadastrar morador";
});

listarMoradores();
atualizarTotal();

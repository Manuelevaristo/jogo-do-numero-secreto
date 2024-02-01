let listaDeNumerosSorteados = [];
let numMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Femele", { rate: 1.2 });
}

exibirTextoNaTela("h1", "Jogo do Numero Secreto");
exibirTextoNaTela("p", `Escolha um número entre 1 e ${numMaximo}`);

document.querySelector("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    verificarChute();
  }
});

// ...
function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela("h1", "Parabéns você Acertou!");
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("chutar").setAttribute("disabled", true);
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("h1", "Número errado!");
      exibirTextoNaTela("p", `Tente outra vez, o número secreto é menor`);
      tentativas++;
      limparCampo();
      document.querySelector("input").focus();
    } else {
      exibirTextoNaTela("h1", "Número errado!");
      exibirTextoNaTela("p", `Tente outra vez, o número secreto é maior`);
      tentativas++;
      limparCampo();
      document.querySelector("input").focus();
    }
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numMaximo + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numMaximo) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = " ";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  document.getElementById("chutar").removeAttribute("disabled");
  document.getElementById("reiniciar").setAttribute("disabled", true);

  limparCampo();
  document.querySelector("input").focus();
  tentativas = 1;
  exibirTextoNaTela("h1", "Jogo do Numero Secreto");
  exibirTextoNaTela("p", `Escolha um número entre 1 e ${numMaximo}`);
}

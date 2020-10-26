let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //tamanho de cada quadrado da área do jogo em pixel

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //o fillRect trabalha com 4 valores: x, y, altura, largura
}

criarBG();
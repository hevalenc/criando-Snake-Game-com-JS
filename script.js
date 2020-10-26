let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //tamanho de cada quadrado da área do jogo em pixel
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //o fillRect trabalha com 4 valores: x, y, altura, largura
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

document.addEventListener("keydown", update); //keydown é um evento de cliques

function update(event){ //criar os comandos para movimentar a cobra e evitar movimento contrário a direção
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    //criar as regras para a cobrinha permanecer no canvas quando exceder o limite da tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    criarBG();
    criarCobrinha();
    //configurando o ponto inicial da cobrinha para iniciar os movimentos
    let snakeX = snake[0].x;
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box; //movimentação em relação ao plano cartesiano
    if(direction == "left") snakeX -= box; 
    if(direction == "up") snakeY -=box;
    if(direction == "down") snakeY +=box;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //configurar intervalo em 100ms
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //tamanho de cada quadrado da área do jogo em pixel
let snake = [];
snake[0] = { //configurar o ponto inicial da cobrinha
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //o .floor tira os números floats e o .random gera números aleatórios
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box); //o fillRect trabalha com 4 valores: x, y, altura, largura
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
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
    
    //criar a condição de finalizar o jogo quando a cobrinha colidir com o seu corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //configurando o ponto inicial da cobrinha para iniciar os movimentos
    let snakeX = snake[0].x;
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box; //movimentação em relação ao plano cartesiano
    if(direction == "left") snakeX -= box; 
    if(direction == "up") snakeY -=box;
    if(direction == "down") snakeY +=box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //configurar intervalo em 100ms
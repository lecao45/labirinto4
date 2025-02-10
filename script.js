// Novo Labirinto Educacional sobre Grandezas Proporcionais
// Design revisado com um caminho claro e funcional

const canvas = document.getElementById('labirintoCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;

// Novo layout do labirinto
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let player = { x: 1, y: 1 };
const exit = { x: 8, y: 8 };

const proportionalityQuestions = [
  {
    question: "Se 3 pessoas levam 6 horas para pintar uma parede, quanto tempo 6 pessoas levarão?",
    options: ["3 horas", "6 horas", "9 horas", "1 hora"],
    answer: "3 horas"
  },
  {
    question: "Se um carro percorre 120 km em 2 horas, quantos km percorrerá em 3 horas mantendo a mesma velocidade?",
    options: ["180 km", "150 km", "200 km", "120 km"],
    answer: "180 km"
  },
  {
    question: "Se 4 torneiras enchem um tanque em 12 horas, em quanto tempo 2 torneiras farão o mesmo trabalho?",
    options: ["24 horas", "6 horas", "12 horas", "48 horas"],
    answer: "24 horas"
  }
];

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      } else {
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
  drawPlayer();
  drawExit();
}

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(
    player.x * tileSize + tileSize / 2,
    player.y * tileSize + tileSize / 2,
    tileSize / 3, 0, Math.PI * 2
  );
  ctx.fill();
}

function drawExit() {
  ctx.fillStyle = 'green';
  ctx.fillRect(exit.x * tileSize + 10, exit.y * tileSize + 10, tileSize - 20, tileSize - 20);
}

function handleQuestion() {
  const randomIndex = Math.floor(Math.random() * proportionalityQuestions.length);
  const question = proportionalityQuestions[randomIndex];
  let userAnswer = "";
  while (!userAnswer) {
    userAnswer = prompt(`${question.question}\n${question.options.join(' | ')}`);
  }
  
  if (userAnswer === question.answer) {
    alert('Resposta correta! Continue pelo labirinto.');
  } else {
    alert('Resposta incorreta! Voltando ao início.');
    player.x = 1;
    player.y = 1;
  }
  drawMaze();
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    drawMaze();

    if (player.x === exit.x && player.y === exit.y) {
      alert('Parabéns! Você completou o labirinto.');
      player.x = 1;
      player.y = 1;
      drawMaze();
    } else if (Math.random() < 0.3) {
      handleQuestion();
    }
  }
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
      movePlayer(1, 0);
      break;
  }
});

// Inicializa o labirinto
drawMaze();

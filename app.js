let fighter1 = document.getElementById('fighter1');
let fighter2 = document.getElementById('fighter2');
let health1 = document.getElementById('health-1');
let health2 = document.getElementById('health-2');
let timerElement = document.getElementById('timer');
let countdownElement = document.getElementById('countdown');

let blocking1 = false;
let blocking2 = false;
let gameRunning = true;
let selectedCharacter1 = 'https://www.fightersgeneration.com/np5/kof12/kyo-12s.gif';
let selectedCharacter2 = 'https://www.fightersgeneration.com/nf8/char/kyo-kusanagi-kof13-stance-99.gif';

function selectCharacter(player, characterImage) {
  if (player === 1) {
    selectedCharacter1 = characterImage;
    document.getElementById('fighter1').style.backgroundImage = `url('${characterImage}')`;
  } else {
    selectedCharacter2 = characterImage;
    document.getElementById('fighter2').style.backgroundImage = `url('${characterImage}')`;
  }
}

function startCountdown() {
  let count = 3;
  countdownElement.style.display = 'block';
  let interval = setInterval(() => {
    countdownElement.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      countdownElement.style.display = 'none';
      startGameTimer();
      startAI();
    }
  }, 1000);
}

function startGameTimer() {
  let timeLeft = 60;
  let timer = setInterval(() => {
    timerElement.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameRunning = false;
  document.getElementById('game-over').textContent = 'Game Over!';
  document.getElementById('game-over').style.display = 'block';
}

document.addEventListener('keydown', (event) => {
  if (!gameRunning) return;
  switch (event.key) {
    
    case 'a':
      moveLeft(fighter1);
      break;
    case 'd':
      moveRight(fighter1);
      break;
    case 'w':
      jump(fighter1);
      break;
    case 's':
      attack(fighter1, health2, blocking2);
      break;
    case 'Shift':
      blocking1 = true;
      break;


    case 'ArrowLeft':
      moveLeft(fighter2);
      break;
    case 'ArrowRight':
      moveRight(fighter2);
      break;
    case 'ArrowUp':
      jump(fighter2);
      break;
    case 'z':
      attack(fighter2, health1, blocking1);
      break;
    case 'Control':
      blocking2 = true;
      break;
  }
});


document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') blocking1 = false;
  if (event.key === 'Control') blocking2 = false;
});

function moveLeft(character) {
let left = parseInt(window.getComputedStyle(character).left);
if (left > 0) character.style.left = left - 10 + 'px';
}

function moveRight(character) {
let left = parseInt(window.getComputedStyle(character).left);
if (left < window.innerWidth - character.offsetWidth) {
character.style.left = left + 10 + 'px';
}
}
function jump(character) {
  character.style.transition = 'bottom 0.3s ease-out';
  character.style.bottom = '150px';
  setTimeout(() => {
    character.style.bottom = '0';
  }, 300);
}

function attack(attacker, defenderHealth, blocking) {
  if (blocking) return;
  attacker.classList.add('attack-animation');
  setTimeout(() => {
    attacker.classList.remove('attack-animation');
    let currentHealth = parseInt(defenderHealth.style.width);
    let newHealth = Math.max(currentHealth - 15, 0);
    defenderHealth.style.width = newHealth + '%';
    if (newHealth === 0) endGame();
  }, 300);
}

function startAI() {
  setInterval(() => {
    if (!gameRunning) return;

 
    let randomMove = Math.floor(Math.random() * 4);
    switch (randomMove) {
      case 0:
        moveLeft(fighter2);
        break;
      case 1:
        moveRight(fighter2);
        break;
      case 2:
        jump(fighter2);
        break;
      case 3:
        attack(fighter2, health1, blocking1);
        break;
    }
  }, 1000);
}

startCountdown();
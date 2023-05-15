function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

const playAgain = document.querySelector('#promptPlayAgain');
function determineWinner({ player, enemy, timerId }) {
  const displayResult = document.querySelector('#displayText');
  winnerAudio(player, enemy)
  clearTimeout(timerId)
  displayResult.style.display = 'flex';
  playAgain.style.display = 'none';
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
  }
  setTimeout(function() {
    displayResult.style.display = 'none';
    playAgain.style.display = 'flex';
  }, 3000);
}

let globalTimer = 60
let timer = globalTimer
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}

const playAgainBtn = document.querySelector('#playAgainBtn');
playAgainBtn.addEventListener('click', function() {
  playAgainFunction();
});

function playAgainFunction() {
  playAgain.style.display = 'none'
  timer = globalTimer
  decreaseTimer()
  isGameOver = false
  
  // Reset player variables
  player.health = 100
  gsap.to('#playerHealth', {
    width: player.health + '%'
  })
  player.position = {
    x: 0,
    y: 0
  }

  // Reset enemy variables
  enemy.health = 100
  gsap.to('#enemyHealth', {
    width: enemy.health + '%'
  })
  enemy.position = {
    x: 1050,
    y: 0
  }
}

const leaveBtn = document.querySelector('#leaveBtn');

leaveBtn.addEventListener('click', function() {
  leaveFunction();
});

function leaveFunction() {
  const playAgainText = document.querySelector('#playAgainText');
  playAgainText.innerHTML = "Goodbye!"
}

// Audio functions
function winnerAudio(player, enemy) {
  if (player.health > enemy.health) {
    const PLAYER_1_WINS = document.getElementById("PLAYER_1_WINS");
    PLAYER_1_WINS.volume = 0.5
    PLAYER_1_WINS.play();
  } else if (player.health < enemy.health) {
    const PLAYER_2_WINS = document.getElementById("PLAYER_2_WINS");
    PLAYER_2_WINS.volume = 0.5
    PLAYER_2_WINS.play();
  } else {
    const GAME_TIE = document.getElementById("GAME_TIE");
    GAME_TIE.volume = 0.5
    GAME_TIE.play();
  }
}
function movementSound() {
  const RUNNING = document.getElementById("RUNNING");
  RUNNING.volume = 0.7
  RUNNING.play();
}

function jumpSound() {
  const JUMPING = document.getElementById("JUMPING");
  JUMPING.volume = 0.5
  JUMPING.play();
}

function PlayerHitSound() {
  const PLAYER_HIT = document.getElementById("PLAYER_HIT");
  PLAYER_HIT.play();
}

function EnemyHitSound() {
  const ENEMY_HIT = document.getElementById("ENEMY_HIT");
  ENEMY_HIT.volume = 0.1
  ENEMY_HIT.play();
}

function PlayerSwordMissSound() {
  const PLAYER_SWORD_MISS = document.getElementById("PLAYER_SWORD_MISS");
  PLAYER_SWORD_MISS.play();
}

function EnemySwordMissSound() {
  const ENEMY_SWORD_MISS = document.getElementById("ENEMY_SWORD_MISS");
  ENEMY_SWORD_MISS.play();
}

function GameMusic() {
  const GAME_MUSIC = document.getElementById("GAME_MUSIC");
  GAME_MUSIC.volume = 0.07
  GAME_MUSIC.loop = true
  GAME_MUSIC.play();
}

function PlayerDeath() {
  const PLAYER_DEATH = document.getElementById("PLAYER_DEATH");
  PLAYER_DEATH.volume = 0.3
  PLAYER_DEATH.play()
}

function EnemyDeath() {
  const PLAYER2_DEATH = document.getElementById("PLAYER2_DEATH");
  PLAYER2_DEATH.volume = 0.3
  PLAYER2_DEATH.play()
}
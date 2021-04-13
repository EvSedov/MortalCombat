const $divArenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['blade', 'nunchucks'],
  attack: function (name) {
    console.log(name + ' Fight...');
  }
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['trident', 'blade'],
  attack: function (name) {
    console.log(name + ' Fight...');
  }
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

const createPlayer = function (playerObj) {
  const $divPlayer = createElement('div', 'player' + playerObj.player)
  const $divProgressbar = createElement('div', 'progressbar')
  const $divCharacter = createElement('div', 'character')
  const $divLife = createElement('div', 'life');
  $divLife.style.width = playerObj.hp + '%';
  const $divName = createElement('div', 'name')
  $divName.innerText = playerObj.name;

  const $img = createElement('img');
  $img.src = playerObj.img;

  $divProgressbar.appendChild($divLife)
  $divProgressbar.appendChild($divName);
  $divCharacter.appendChild($img);
  $divPlayer.appendChild($divProgressbar)
  $divPlayer.appendChild($divCharacter);

  return $divPlayer;  
};

function playerWins(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  if (name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }
  return $loseTitle;
};

function getRandom(numUpInterval) {
  return Math.floor(Math.random() * (numUpInterval + 1));
};

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  const damage = getRandom(20);
  player.hp -= damage;  

  if (player.hp <= 0) {
    player.hp = 0;
  }
  
  $playerLife.style.width = player.hp + '%';
};

$randomButton.addEventListener('click', function() {
  changeHP(player1);
  changeHP(player2);

  if(player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $divArenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $divArenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 || player2.hp === 0) {
    $divArenas.appendChild(playerWins());
  }
})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));

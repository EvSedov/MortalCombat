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

function playerLose(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerText = name + ' lose';
  return $loseTitle;
};

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  const damage = Math.floor(Math.random() * 21);
  player.hp -= damage;  

  if (player.hp <= 0) {
    $randomButton.disabled = true;
    player.hp = 0;
    $divArenas.appendChild(playerLose(player.name));
  }
  
  $playerLife.style.width = player.hp + '%';
};

$randomButton.addEventListener('click', function() {
  changeHP(player1);
  changeHP(player2);
})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));

const $divArenas = document.querySelector('.arenas');

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

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));

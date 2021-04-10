const player1 = {
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['blade', 'nunchucks'],
  attack: function () {
    console.log(this.name + ' Fight...');
  }
};

const player2 = {
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['trident', 'blade'],
  attack: function () {
    console.log(this.name + ' Fight...');
  }
};

const createPlayer = function (className, player) {
  const $divPlayer = document.createElement('div')
  $divPlayer.classList.add(className);
  const $divProgressbar = document.createElement('div')
  $divProgressbar.classList.add('progressbar');
  const $divCharacter = document.createElement('div')
  $divCharacter.classList.add('character');
  const $divLife = document.createElement('div');
  $divLife.classList.add('life');
  $divLife.style.width = player.hp + '%';
  const $divName = document.createElement('div')
  $divName.classList.add('name');
  $divName.innerText = player.name;

  const $img = document.createElement('img');
  $img.src = player.img;

  $divProgressbar.appendChild($divLife)
  $divProgressbar.appendChild($divName);
  $divCharacter.appendChild($img);
  $divPlayer.appendChild($divProgressbar)
  $divPlayer.appendChild($divCharacter);

  const $divArenas = document.querySelector('.arenas');
  $divArenas.appendChild($divPlayer);
  
};

createPlayer('player1', player1);
createPlayer('player2', player2);

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

const createPlayer = function (className, playerName, hp) {
  const $divPlayer1 = document.createElement('div')
  $divPlayer1.classList.add(className);
  const $divProgressbar = document.createElement('div')
  $divProgressbar.classList.add('progressbar');
  const $divCharacter = document.createElement('div')
  $divCharacter.classList.add('character');
  const $divLife = document.createElement('div');
  $divLife.classList.add('life');
  $divLife.style.width = hp + '%';
  const $divName = document.createElement('div')
  $divName.classList.add('name');
  $divName.innerText = playerName;

  const $img = document.createElement('img');
  $img.src = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif';

  $divProgressbar.appendChild($divLife)
  $divProgressbar.appendChild($divName);
  $divCharacter.appendChild($img);
  $divPlayer1.appendChild($divProgressbar)
  $divPlayer1.appendChild($divCharacter);

  const $divArenas = document.querySelector('.arenas');
  $divArenas.appendChild($divPlayer1);
  
};

createPlayer('player1', 'SCORPION', 80);
createPlayer('player2', 'SUB-ZERO', 50);

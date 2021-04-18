const $divArenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

function changeHP(damage) {
  this.hp -= damage;  

  if (this.hp <= 0) {
    this.hp = 0;
  }
};

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  const $playerLife = this.elHP();
  $playerLife.style.width = this.hp + '%';
}

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['blade', 'nunchucks'],
  attack: function (name) {
    console.log(name + ' Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['trident', 'blade'],
  attack: function (name) {
    console.log(name + ' Fight...');
  },
  changeHP,
  elHP,
  renderHP,
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

function getRandom(numUpperInterval) {
  return Math.floor(Math.random() * (numUpperInterval + 1));
};

function createReloadButton() {
  const $divReloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $button.addEventListener('click', function() {
    window.location.reload();
  });
  $divReloadWrap.appendChild($button);
  $divArenas.appendChild($divReloadWrap);
}

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(2)];  
  const defence = ATTACK[getRandom(2)];

  return {
    value: getRandom(HIT[hit]),
    defence,
    hit,
  }
}

function showWiner() {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $divArenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $divArenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 || player2.hp === 0) {
    $divArenas.appendChild(playerWins());
  }
};

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = {};
  
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    
    item.checked = false;
  }
  
  if (enemy.hit !== attack.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }
  
  if (attack.hit !== enemy.defence) {
    player2.changeHP(attack.value);
    player2.renderHP();
  }

  if(player1.hp === 0 || player2.hp === 0) {
    createReloadButton();
  }
  showWiner();
})
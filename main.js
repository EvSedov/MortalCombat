import { generateLogs } from "./logs.js";
import { getRandom } from './utils.js';
import { Player } from './player.js';

const $divArenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];



const player1 = new Player({
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['blade', 'nunchucks'],
});

const player2 = new Player({
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['trident', 'blade'],
});
console.log("🚀 ~ file: main.js ~ line 33 ~ player2", player2)

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

const createPlayer = (playerObj) => {
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

const playerWins = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');
  if (name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }
  return $loseTitle;
};

const createReloadButton = () => {
  const $divReloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $button.addEventListener('click', function() {
    window.location.reload();
  });
  $divReloadWrap.appendChild($button);
  $divArenas.appendChild($divReloadWrap);
};


$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));

const enemyAttack = () => {
  const hit = ATTACK[getRandom(2)];  
  const defence = ATTACK[getRandom(2)];

  return {
    value: getRandom(HIT[hit]),
    defence,
    hit,
  }
};

const playerAttack = () => {
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
  return attack;
};


window.onload = $chat.insertAdjacentHTML('afterbegin', generateLogs('start', player1, player2));

const showWiner = () => {
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $chat.insertAdjacentHTML('afterbegin', generateLogs('end', player2, player1));
    $divArenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $chat.insertAdjacentHTML('afterbegin', generateLogs('end', player1, player2));
    $divArenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $chat.insertAdjacentHTML('afterbegin', generateLogs('draw'));
    $divArenas.appendChild(playerWins());
  }
};

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = playerAttack();
  
  if (enemy.hit !== attack.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1);
  } else {
    $chat.insertAdjacentHTML('afterbegin', generateLogs('defence', player2, player1));
  }
  
  if (attack.hit !== enemy.defence) {
    player2.changeHP(attack.value);
    player2.renderHP();
    $chat.insertAdjacentHTML('afterbegin', generateLogs('hit', player1, player2));
  } else {
    $chat.insertAdjacentHTML('afterbegin', generateLogs('defence', player1, player2));
  }

  if(player1.hp === 0 || player2.hp === 0) {
    createReloadButton();
    showWiner();
  }
});

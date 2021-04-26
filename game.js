import { generateLogs } from "./logs.js";
import { createReloadButton, playerWins, createPlayer } from './elements-for-game.js';
import { enemyAttack, playerAttack } from './utils.js';
import { player1, player2 } from './players.js';

export class Game {
  constructor() {
  }

  start = () => {
    const $divArenas = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');
    const $chat = document.querySelector('.chat');

    const $divPlayar1 = createPlayer(player1);
    const $divPlayar2 = createPlayer(player2);
    $divArenas.appendChild($divPlayar1);
    $divArenas.appendChild($divPlayar2);

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
      const attack = playerAttack(e.target);

      if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        $chat.insertAdjacentHTML('afterbegin', generateLogs('hit', player2, player1));
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
        createReloadButton($divArenas);
        showWiner();
      }
    });
  }
};

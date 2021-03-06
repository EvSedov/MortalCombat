const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

export const getRandom = (numUpperInterval) => Math.floor(Math.random() * (numUpperInterval + 1));

export const enemyAttack = () => {
  const hit = ATTACK[getRandom(2)];  
  const defence = ATTACK[getRandom(2)];

  return {
    value: getRandom(HIT[hit]),
    defence,
    hit,
  }
};

export const playerAttack = (formFight) => {
  const attack = {};
  for (let item of formFight) {
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

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.weapon = props.weapon;
    this.img = props.img;
  }

  attack = () => {
    console.log(this.name + ' Fight...');
  };

  changeHP = (damage) => {
    this.hp -= damage;  

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => document.querySelector(`.player${this.player} .life`);

  renderHP = () => {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
  };
};

export const player1 = new Player({
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['blade', 'nunchucks'],
});

export const player2 = new Player({
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['trident', 'blade'],
});

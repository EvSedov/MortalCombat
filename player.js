export class Player {
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

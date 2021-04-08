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


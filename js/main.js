var game = new Phaser.Game(640, 380, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', 'assets/img/bc.png');
        this.load.image();
        this.load.image();
        this.load.image();
        this.load.image();    
    },

    create: function(){
        this.background = this.game.add.sprite(0, 0, 'background');
    },

    update: function(){

    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
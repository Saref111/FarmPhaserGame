var game = new Phaser.Game(600, 300, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', 'assets/img/bc.png');
        this.load.image('pig', 'assets/img/pig.png');
        this.load.image('cow', 'assets/img/cow.png');
        this.load.image('sheep', 'assets/img/sheep.png');
        this.load.image('chicken', 'assets/img/chicken.png');    
    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.setTo(0.5);
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5);
        this.chicken.scale.setTo(0.5);
    },

    update: function(){

    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
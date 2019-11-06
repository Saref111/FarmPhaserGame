var game = new Phaser.Game(600, 300, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', 'assets/img/bc.png');
        this.load.image('pig', 'assets/img/pig.png');
        this.load.image('cow', 'assets/img/cow.png');
        this.load.image('sheep', 'assets/img/sheep.png');
        this.load.spritesheet('chicken', 'assets/img/chicken-sprite.png', 240, 299, 3);
        this.load.image('arrow', 'assets/img/arrow.png');    
    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.setTo(0.5);

        //GROUP OF ANIMALS

        var animalData = [
            {key: 'pig', text: 'PIG'},
            {key: 'cow', text: 'COW'},
            {key: 'sheep', text: 'SHEEP'},
            {key: 'chicken', text: 'CHICKEN'}
        ];

        this.animals = this.game.add.group();

        var self = this;
        var animal;

        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
            animal.anchor.setTo(0.5);

            animal.animations.add('animate', [0, 1, 2, 1, 0], 3, false);

            if(element.key == 'chicken'){
                animal.scale.setTo(0.4);
            }else if(element.key == 'cow'){
                animal.scale.setTo(0.6);
            }else if(element.key == 'sheep' || element.key == 'pig'){
                animal.scale.setTo(0.5)
            }

            animal.customParams = {text: element.text};

            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
        //ARROWS

        this.arrowLeft = this.game.add.sprite(50, 160, 'arrow');
        this.arrowLeft.anchor.setTo(0.5);
        this.arrowLeft.scale.setTo(0.18);
        this.arrowLeft.customParams = {direction: -1};
        this.arrowLeft.inputEnabled = true;
        this.arrowLeft.input.pixelPerfectClick = true;
        this.arrowLeft.events.onInputDown.add(this.switchAnimal, this);

        this.arrowRight = this.game.add.sprite(550, 160, 'arrow');
        this.arrowRight.anchor.setTo(0.5);
        this.arrowRight.scale.setTo(-0.18);
        this.arrowRight.customParams = {direction: 1}; 
        this.arrowRight.inputEnabled = true;
        this.arrowRight.input.pixelPerfectClick = true;
        this.arrowRight.events.onInputDown.add(this.switchAnimal, this);

       
    },

    update: function(){
    },

    switchAnimal: function(sprite, event){
        if(this.isMoving){
            return false;
        }

        this.isMoving = true;

        var newAnimal;
        var endX;

        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 600 + this.currentAnimal.width/2;
        }else {
            newAnimal = this.animals.previous();
            newAnimal.x = 600 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }

        
        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: game.world.centerX}, 1000);
        newAnimalMovement.onComplete.add(function(){
            this.isMoving = false;
        }, this);
        newAnimalMovement.start();

        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal;
    },

    animateAnimal: function(sprite, event){
        sprite.play('animate');
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
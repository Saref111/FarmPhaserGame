var game = new Phaser.Game(600, 300, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', 'assets/img/bc.png');
        this.load.spritesheet('pig', 'assets/img/pig-sprite.png', 285, 300, 3);
        this.load.spritesheet('cow', 'assets/img/cow-sprite.png', 264, 299, 3);
        this.load.spritesheet('sheep', 'assets/img/sheep-sprite.png', 288, 300, 3);
        this.load.spritesheet('chicken', 'assets/img/chicken-sprite.png', 240, 299, 3);
        this.load.image('arrow', 'assets/img/arrow.png');   
        
        this.load.audio('pigSound', ['assets/audio/pig.mp3', 'assets/audio/pig.ogg']);
        this.load.audio('cowSound', ['assets/audio/cow.mp3', 'assets/audio/cow.ogg']);
        this.load.audio('sheepSound', ['assets/audio/sheep.mp3', 'assets/audio/sheep.ogg']);
        this.load.audio('chickenSound', ['assets/audio/chicken.mp3', 'assets/audio/chicken.ogg']);
    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.background.anchor.setTo(0.5);

        //GROUP OF ANIMALS

        var animalData = [
            {key: 'pig', text: 'PIG', audio: 'pigSound'},
            {key: 'cow', text: 'COW', audio: 'cowSound'},
            {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'},
            {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'}
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

            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};

            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

        //Show text
        this.showText(this.currentAnimal);
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

        this.animalText.visible = false;

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
            this.showText(newAnimal);
        }, this);
        newAnimalMovement.start();

        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal;
    },

    showText: function(animal){
        var style = {
            font: 'bold 30pt Arial',
            fill: '#D0171B',
            align: 'center'
        };
        this.animalText = this.game.add.text(this.game.width/2, this.game.height*0.89, '', style);
        this.animalText.anchor.setTo(0.5);

        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    },

    animateAnimal: function(sprite, event){
        sprite.play('animate');
        sprite.customParams.sound.play();
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
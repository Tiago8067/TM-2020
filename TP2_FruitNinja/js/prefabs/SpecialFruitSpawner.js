var FruitNinja = FruitNinja || {};

//Construtor para o "spawn" de frutas especiais (responsavel por "atirar" as frutas especiais para o ecran)
FruitNinja.SpecialFruitSpawner = function (game_state, name, position, properties) {
      //Chamamos o método spawner que vai ser responsável por "atirar" as frutas para o ecran
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
    
    this.frames = properties.frames;
};

//Associamos o objeto ao construtor.
FruitNinja.SpecialFruitSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.SpecialFruitSpawner.prototype.constructor = FruitNinja.SpecialFruitSpawner;


FruitNinja.SpecialFruitSpawner.prototype.create_object = function (name, position, velocity) {
        // Atirar mos a imagem de uma fruta numa determinada posição com uma determinada velocidade sendo que neste caso a fruta especial vai
        //à melancia que se trata da frame 15 da imagem relativas às frutas
    return new FruitNinja.SpecialFruit(this.game_state, name, position, {texture: "fruits_spritesheet", group: "special_fruits", frame: 15, velocity: velocity});
};
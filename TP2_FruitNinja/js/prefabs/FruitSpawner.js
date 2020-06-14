var FruitNinja = FruitNinja || {};

//Construtor para o "spawn" de frutas (responsavel por "atirar" as frutas para o ecran)
FruitNinja.FruitSpawner = function (game_state, name, position, properties) {
    //Chamamos o método spawner que vai ser responsável por "atirar" as frutas para o ecran
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
    
    this.frames = properties.frames;
};

//Associamos o objeto ao construtor
FruitNinja.FruitSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.FruitSpawner.prototype.constructor = FruitNinja.FruitSpawner;

FruitNinja.FruitSpawner.prototype.create_object = function (name, position, velocity) {
    // Atirar a imagem de uma fruta numa determinada posição com uma determinada velocidade
    return new FruitNinja.Fruit(this.game_state, name, position, {texture: "fruits_spritesheet", group: "fruits", frames: this.frames, velocity: velocity});
};
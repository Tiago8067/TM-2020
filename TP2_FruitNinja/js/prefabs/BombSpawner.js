var FruitNinja = FruitNinja || {};

//Construtor para o "spawn" de bombas (responsavel por "atirar" as bombas para o ecran)
FruitNinja.BombSpawner = function (game_state, name, position, properties) {
    //Chamamos o método spawner que vai ser responsável por "atirar" as bombas para o ecran
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
};


//Associar objeto ao respetivo construtor
FruitNinja.BombSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.BombSpawner.prototype.constructor = FruitNinja.BombSpawner;


//Método para atirar bombas numa determinada posição com uma determinada velocidade
FruitNinja.BombSpawner.prototype.create_object = function (name, position, velocity) {
    // Atirar a imagem bomba numa determinada posição com uma determinada velocidade
    return new FruitNinja.Bomb(this.game_state, name, position, {texture: "bomb_image", group: "bombs", velocity: velocity});
};
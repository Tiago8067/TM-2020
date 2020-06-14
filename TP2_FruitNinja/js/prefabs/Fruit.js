var FruitNinja = FruitNinja || {};

//Construtor da fruta
FruitNinja.Fruit = function (game_state, name, position, properties) {
    var frame_index;
    //Chamamos o método cuttable para exibir particulas após o cote das frutas
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    this.frames = properties.frames;
    
    frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
    this.frame = this.frames[frame_index];
    
    //Tamanho das frutas
    this.body.setSize(20, 20);
};

//Associar objetos ao construtor
FruitNinja.Fruit.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.Fruit.prototype.constructor = FruitNinja.Fruit;

//Metodo que vai conter a sua posição e respetiva velocidade da fruta
FruitNinja.Fruit.prototype.reset = function (position_x, position_y, velocity) {
    var frame_index;
    FruitNinja.Cuttable.prototype.reset.call(this, position_x, position_y, velocity);
    frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
    this.frame = this.frames[frame_index];
};

//Método para incrementar o score em 1 sempre que uma fruta for cortada
FruitNinja.Fruit.prototype.cut = function () {
    FruitNinja.Cuttable.prototype.cut.call(this);
    this.game_state.score += 1;

    //Após uma fruta ser cortada removemos-a.
    this.kill();
};
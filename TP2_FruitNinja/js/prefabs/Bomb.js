var FruitNinja = FruitNinja || {};

//Contrutor para a bomba 
FruitNinja.Bomb = function (game_state, name, position, properties) {

    //Chamamos o método cuttable para exibir particulas após o corte das bombas
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    //Estabelecer tamanho da bomba
    this.body.setSize(20, 20);
};

//Associar objeto ao seu construtor
FruitNinja.Bomb.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.Bomb.prototype.constructor = FruitNinja.Bomb;

//Corte de Bombas
FruitNinja.Bomb.prototype.cut = function () {
    //Chamamos o método cut para verificar o corte 
    FruitNinja.Cuttable.prototype.cut.call(this);
    //Se uma bomba for cortada o jogador perde uma vida (Removida através do método die 
    //previamente criado no ficheiro relativo às vidas) e a bomba é removida através do método kill criado no ficheiro cut
    //(Removemos a imagem da bomba cortada)
    this.game_state.prefabs.lives.die();
    this.kill();
};



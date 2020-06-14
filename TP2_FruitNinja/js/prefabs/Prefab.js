var FruitNinja = FruitNinja || {};

//Função para desenhar um sprite consoante o estado do jogo
//atribuindo lhe um nome, posição e ainda as propriedades necessárias
FruitNinja.Prefab = function (game_state, name, position, properties) {
    Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);
    
    this.game_state = game_state;
    
    this.name = name;

    //Permitenos escolher um grupo e uma frame
    
    this.game_state.groups[properties.group].add(this);
    this.frame = properties.frame;
    
    this.game_state.prefabs[name] = this;
};

//Associar objeto ao respetivo construtor
FruitNinja.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
FruitNinja.Prefab.prototype.constructor = FruitNinja.Prefab;
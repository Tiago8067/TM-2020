var FruitNinja = FruitNinja || {};

//Contrutor para a pontuação que recebe o estado do jogo para se o mesmo acabar reniciar a pontuação
// a posição do pontuação e ainda as propriedades

FruitNinja.Score = function (game_state, name, position, properties) {
    //Chamamos o método para exibir o texto de pontuação
    Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text, properties.style);
    
    this.game_state = game_state;
    
    this.name = name;
    
    //Associamos-lhes as propriedades estabelecidas no ficheiro json que são essecialmente para definir o background
    this.game_state.groups[properties.group].add(this);
    
    this.game_state.prefabs[name] = this;
};

//Associar objeto ao respetivo construtor
FruitNinja.Score.prototype = Object.create(Phaser.Text.prototype);
FruitNinja.Score.prototype.constructor = FruitNinja.Score;

//Relizar o update do score sempre que cortamos uma fruta (1 ponto por fruta)
FruitNinja.Score.prototype.update = function () {
    // Atualizar texto
    this.text = "Frutas: " + this.game_state.score;
};
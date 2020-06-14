var FruitNinja = FruitNinja || {};

//Construtor para o corte responsável pelo corte de todos os objetos do nosso jogo
FruitNinja.Cut = function (game_state, name, position, properties) {
    Phaser.Graphics.call(this, game_state.game, position.x, position.y);
    
    this.game_state = game_state;
    
    this.name = name;
    
    this.game_state.groups[properties.group].add(this);
    
    this.game_state.prefabs[name] = this;
    
    // Cor e largura
    this.beginFill(properties.style.color);
    this.lineStyle(properties.style.line_width, properties.style.color, properties.style.alpha);
    
    // Desenhar a linha 
    this.moveTo(properties.start.x, properties.start.y);
    this.lineTo(properties.end.x, properties.end.y);
    
    // Apagar a linha depois de um determinado periodo
    this.kill_timer = this.game_state.time.create();
    this.kill_timer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
    this.kill_timer.start();
};

//Associar objeto ao construtor
FruitNinja.Cut.prototype = Object.create(Phaser.Graphics.prototype);
FruitNinja.Cut.prototype.constructor = FruitNinja.Cut;


//Metodo para eliminar o objeto
FruitNinja.Cut.prototype.kill = function () {
    //Removemos os objeto através da função clear
    this.clear();

    //Este comando permite se chamarmos o método kill associa-lo ao mesmo
    Phaser.Graphics.prototype.kill.call(this);
};
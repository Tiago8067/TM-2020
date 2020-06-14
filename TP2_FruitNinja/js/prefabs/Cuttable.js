var FruitNinja = FruitNinja || {};

//Construtor Cuttable que determina se um objeto pode ser cortado ou não e define o seu movimento
FruitNinja.Cuttable = function (game_state, name, position, properties) {
    //Chamamos o prefab que nos vai permitir desenhar sprites
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    this.scale.setTo(5);
    
    this.game_state.game.physics.arcade.enable(this);
    
    //Difinir velocidade
    this.velocity = properties.velocity;
    this.body.velocity.y = -this.velocity.y;
    this.body.velocity.x = this.velocity.x;
    
    // Não permitir cortar objetos fora do ecran (elimina-os)
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

//Associar objeto ao construtor
FruitNinja.Cuttable.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Cuttable.prototype.constructor = FruitNinja.Cuttable;


//Método para dar estabelecer uma posição e velocidade
FruitNinja.Cuttable.prototype.reset = function (position_x, position_y, velocity) {
    Phaser.Sprite.prototype.reset.call(this, position_x, position_y);
    //Definir velocidade
    this.body.velocity.y = -velocity.y;
    this.body.velocity.x = velocity.x;
};

//Função de corte
FruitNinja.Cuttable.prototype.cut = function () {
    var emitter;
    // Creamos um emissor que vai ser responsavel por libertar um conjunto de particulas que correspondem a imagens
    //quando a fruta é cortada
    emitter = this.game_state.game.add.emitter(this.x, this.y);

    //Associamos a imagem ao emissor
    emitter.makeParticles("particle_image");

    // Estabelecemos a gravidade e velocidade das particulas
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;

    // Quando cortamos um objeto fazemos a respetiva emissão de particulas que vão simplesmente cair como a gravidade é 0
    //de modo a simularem o corte da fruta (Velocidade 700 e número máximo de 1000)
    emitter.start(true, 700, null, 1000);
};
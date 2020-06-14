var FruitNinja = FruitNinja || {};

//Construtor da special fruit que não e nada mais que uma fruta que vai ter a capacidade
//de ficar parada no ecarn quando for cortada pela primeira vez para poder ser cortada
//um número sequencial de vezes até desaparcer
FruitNinja.SpecialFruit = function (game_state, name, position, properties) {
    var frame_index;
    //Chamamos o método cuttable para exibir particulas após o corte
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    //Tamanho da fruta
    this.body.setSize(20, 20);
    
    // Criamos um timer para que a fruta não ser destruida da primeira vez que é cortada.
    this.kill_timer = this.game_state.game.time.create(false);
};

//Associar objeto ao construtor
FruitNinja.SpecialFruit.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.SpecialFruit.prototype.constructor = FruitNinja.SpecialFruit;


//Função para remover a fruta especial
FruitNinja.SpecialFruit.prototype.kill = function () {
    Phaser.Sprite.prototype.kill.call(this);
    // Quando cortamos a fruta pela primeira vez esta vai ficar parada para ser cortada um número
    // sequencial de vezes até ser removida
    this.body.allowGravity = true;
    this.kill_timer.stop();
};

FruitNinja.SpecialFruit.prototype.cut = function () {
    FruitNinja.Cuttable.prototype.cut.call(this);
    // Por cada vez que ela for cortada aumentamos a pontuação em 1
    this.game_state.score += 1;
    // Se for a primeira vez que a mesma é cortada esta fica parada e iniciamos o timer para remove-la
    if (!this.kill_timer.running) {
        //Removemos a gravidade e estabalecemos a velocidade como 0
        this.body.allowGravity = false;
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;
        //Estabemecemos um timer de 3 segundos até a fruta ser removida.
        this.kill_timer.add(Phaser.Timer.SECOND * 3, this.kill, this);
        this.kill_timer.start();
    }
};
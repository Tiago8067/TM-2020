var FruitNinja = FruitNinja || {};


//Contrutor para a pontuação que recebe o estado do jogo para se o mesmo acabar reestabelecer as vidas para 3
// a posição do pontuação e ainda as propriedades
FruitNinja.Lives = function (game_state, name, position, properties) {
    var live_index, life;

    //Exibir Vidas
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    //Estabelecemos o prefab como invisivel de modo a podermos criar vários sprites com a mesma textura
    this.visible = false;
    
    this.lives = properties.lives;

    //Intanciamos um array de vidas de modo a podermos removelas mais tarde
    this.lives_sprites = [];
    // Desenhar uma imagem por cada vida
    for (live_index = 0; live_index < this.lives; live_index += 1) {
        life = new Phaser.Sprite(this.game_state.game, position.x + (live_index * properties.lives_spacing), position.y, this.texture);
        //Adionamos as imagens ao array através do método push
        this.lives_sprites.push(life);

        //Adicionar vidas ao ecran
        this.game_state.groups.hud.add(life);
    }
};

//Associar objeto ao respetivo construtor
FruitNinja.Lives.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Lives.prototype.constructor = FruitNinja.Lives;

//Função para remover vidas caso cortemos uma bomba
FruitNinja.Lives.prototype.die = function () {
    var life;
    this.lives -= 1;
    //Removemos uma vida através do método "pop" e "kill" 
    //O pop selecionada a vida a remover no array (neste caso a última) e o kill 
    // é usado para remover o objeto ( Neste caso usada para remover a imagem )
    life = this.lives_sprites.pop();
    life.kill();
    // Se o número de vidas for igual a zero declaramos o jogo como terminado
    if (this.lives === 0) {
        this.game_state.game_over();
    }
};
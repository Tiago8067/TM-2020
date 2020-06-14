var FruitNinja = FruitNinja || {};

//Construtor para o painel de game over
FruitNinja.GameOverPanel = function (game_state, name, position, properties) {
    var movement_animation;
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.text_style = properties.text_style;
    
    this.alpha = 0.5;
    // Animação de game over (painel que desliza para cima e mostra pontuações)
    movement_animation = this.game_state.game.add.tween(this);
    movement_animation.to({y: 0}, properties.animation_time);
    movement_animation.onComplete.add(this.show_game_over, this);
    movement_animation.start();
};

//Associar objeto ao construtor
FruitNinja.GameOverPanel.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.GameOverPanel.prototype.constructor = FruitNinja.GameOverPanel;

FruitNinja.GameOverPanel.prototype.show_game_over = function () {
    var game_over_text, current_score_text, highest_score_text, help_text;
    // Adicionar texto de game over 
    game_over_text = this.game_state.game.add.text(this.game_state.game.world.width  -850, this.game_state.game.world.height * 0.4, "Fim do Jogo", this.text_style.game_over);
    game_over_text.anchor.setTo(0.5);
    this.game_state.groups.hud.add(game_over_text);
    
    // Mostrar pontuação
    current_score_text = this.game_state.game.add.text(this.game_state.game.world.width -850, this.game_state.game.world.height * 0.5, "Pontuação: " + this.game_state.score, this.text_style.current_score);
    current_score_text.anchor.setTo(0.5);
    this.game_state.groups.hud.add(current_score_text);
    
    // Mostar Highscore
    highest_score_text = this.game_state.game.add.text(this.game_state.game.world.width -850, this.game_state.game.world.height * 0.6, "Melhor Pontuação: " + localStorage.highest_score, this.text_style.highest_score);
    highest_score_text.anchor.setTo(0.5);
    this.game_state.groups.hud.add(highest_score_text);

    //Texto de ajuda
    help_text = this.game_state.game.add.text(this.game_state.game.world.width -840, this.game_state.game.world.height * 0.8, "Pressione o Rato para Recomeçar!", this.text_style.game_over);
    help_text.anchor.setTo(0.5);
    this.game_state.groups.hud.add(help_text);
    
    // Reniciar o jogo caso primamos o rato
    this.inputEnabled = true;
    this.events.onInputDown.add(this.game_state.restart_level, this.game_state);
};
//Carregamento do ficheiro json com a informação do nível e incialização do "LoadingState"
var FruitNinja = FruitNinja || {};
FruitNinja.BootState = function () {
    Phaser.State.call(this);
};

//Associar objeto ao respetivo construtor
FruitNinja.prototype = Object.create(Phaser.State.prototype);
FruitNinja.prototype.constructor = FruitNinja.BootState;

//Incializar o nivel
FruitNinja.BootState.prototype.init = function (level_file) {
    this.level_file = level_file;
};

//Texto indicador do nível
FruitNinja.BootState.prototype.preload = function () {
    this.load.text("level1", this.level_file);
};

//Iniciar LoadingState
FruitNinja.BootState.prototype.create = function () {
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data);
};
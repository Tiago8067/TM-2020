//Aqui damos load dos assets do jogo e inicializamos o "Level State"
var FruitNinja = FruitNinja || {};

FruitNinja.LoadingState = function () {
    Phaser.State.call(this);
};

//Associar objeto ao respetivo construtor
FruitNinja.prototype = Object.create(Phaser.State.prototype);
FruitNinja.prototype.constructor = FruitNinja.LoadingState;


FruitNinja.LoadingState.prototype.init = function (level_data) {
    this.level_data = level_data;
};


//Carregar assets (imagems, spritesheets e audio)
FruitNinja.LoadingState.prototype.preload = function () {
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    //Damos load dos assests de acordo com a key associada aos mesmos no ficheiro json
    for (asset_key in assets) { 
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "audio":
                this.load.audio(asset_key,asset.source);
                break;
            }
        }
    }
};

//Iniciar o jogo
FruitNinja.LoadingState.prototype.create = function () {
    this.game.state.start("GameState", true, false, this.level_data);
};
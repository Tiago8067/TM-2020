var FruitNinja = FruitNinja || {};

//Declaração do jogo
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);

//Estados do jogo
game.state.add("BootState", new FruitNinja.BootState());
game.state.add("LoadingState", new FruitNinja.LoadingState());
game.state.add("GameState", new FruitNinja.LevelState());
game.state.start("BootState", true, false, "assets/levels/level1.json");
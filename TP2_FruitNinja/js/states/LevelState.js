    /*Criação de grupos de níveis através dos grupos criados no arquivo JSON. 
Após darmos load de todos os prefabs necessários do arquivo JSON chamamos o método “create_prefab”,
 que será respónsavel por ir buscar o prefab pretendido. Para fazer isso, criamos um objeto 
 que mapeia cada tipo  para o seu respetivo construtor.
 Desta forma, para instanciar um novo prefab nós verificamos se o tipo já esta nos objetos 
 “prefab_classes”, e se assim for, chamamos o construtor correto (So funciona porque o construtor é
comum para todos).*/

//Variavel de jogo
var FruitNinja = FruitNinja || {};


//Construtor
FruitNinja.LevelState = function () {
    Phaser.State.call(this);

    //Spawners de frutas e background
    
    this.prefab_classes = {
        "fruit_spawner": FruitNinja.FruitSpawner.prototype.constructor,
        "bomb_spawner": FruitNinja.BombSpawner.prototype.constructor,
        "special_fruit_spawner": FruitNinja.SpecialFruitSpawner.prototype.constructor,
        "background": FruitNinja.Prefab.prototype.constructor
    };
};

//Mapeamento dos objetos para o seu construtor
FruitNinja.LevelState.prototype = Object.create(Phaser.State.prototype);
FruitNinja.LevelState.prototype.constructor = FruitNinja.LevelState;

FruitNinja.LevelState.prototype.init = function (level_data) {
    this.level_data = level_data;

    //Fullscreen
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    // Fisicas
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    //Minima largura do corte
    this.MINIMUM_SWIPE_LENGTH = 50;

    //Variável pontuação
    this.score = 0;

    //Variável vidas
    this.lives = 3;
};

FruitNinja.LevelState.prototype.create = function () {
    var group_name, prefab_name;
    
    // criar grupos
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    // Criar prefabs para criar, configurar e armazenar um GameObject e
    //todos os seus componentes, valores, propriedades e childs.
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    }
    
    // Eventos para verificar a existência de um corte
    //Quando premimos o mouse (onDown) ele começa a registar o corte e quando o largamos (onUp)
    //termina esse mesmo corte.
    this.game.input.onDown.add(this.start_swipe, this);
    this.game.input.onUp.add(this.end_swipe, this);


    //Música de Jogo
    this.musica = this.sound.add('themesong');
    //Dar loop da música de jogo
    this.musica.loop = true;
    this.corte = this.sound.add('corte');
    this.gameover = this.sound.add('gameover');



    //Musica de background
    this.musica.play();


    //Inicializar o ecran de jogo
    this.init_hud();


    //Instruções
    this.add.sprite(1285, 50,'FruitNinja');
    this.add.text(1390,200,"Instruções  :",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold'});
    this.add.text(1330,250,"Cortar o máximo de frutas que conseguir!",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1360,270,"Evitar cortar as bombas!",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1345,290,"Ter em Atenção as Frutas Especiais!",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});

    //Créditos
    this.add.sprite(1335, 400,'ipvc');
    this.add.text(1360,500,"Instituto Politécnico",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1360,520,"de Viana do Castelo",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1350,600,"Trabalho Realizado por:",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1350,650,"Tiago Soares nº:22340",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});
    this.add.text(1350,670,"Miguel Monteiro nº:22063",{ font: '20px Lemon', fill: "#FFF", fontStyle: 'bold', align: 'center'});

    

    
};


//Criação de Prefabs
FruitNinja.LevelState.prototype.create_prefab = function (prefab_name, prefab_data) {
    var prefab;
    // Criar um objeto de acordo com o respetivo tipo
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
};

//Inicializar corte
//Determina a posição (x,y) onde o corte se iniciou
FruitNinja.LevelState.prototype.start_swipe = function (pointer) {
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
};

//Finalizar corte
//Determina a posição (x,y) onde o corte acabou e interligas os dois pontos
FruitNinja.LevelState.prototype.end_swipe = function (pointer) {
    var swipe_length, cut_style, cut;
    this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);

    //Calculamos a distância entre os dois pontos com base na função "distance"
    swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);
    // Se o corte for superior ao minimo estabelecido´
    // criamos um novo corte e verificamos se existe colisões com a respetiva fruta
    if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {

        //Design do corte
        cut_style = {line_width: 5, color: 0xE82C0C, alpha: 1};

        //Criação do corte com o estilo definido e com uma duração predefinida para desaparecer após um determinado período de tempo.
        cut = new FruitNinja.Cut(this, "cut", {x: 0, y: 0}, {group: "cuts", start: this.start_swipe_point, end: this.end_swipe_point, duration: 0.3, style: cut_style});

        //O corte é representado por uma linha para o utilizador
        this.swipe = new Phaser.Line(this.start_swipe_point.x, this.start_swipe_point.y, this.end_swipe_point.x, this.end_swipe_point.y);


        //Verificamos a colisão com frutas normais e especiais e bombas.
        this.groups.fruits.forEachAlive(this.check_collision, this);
        this.groups.bombs.forEachAlive(this.check_collision, this);
        this.groups.special_fruits.forEachAlive(this.check_collision, this);
    }
};


//Função para verificar colisão
FruitNinja.LevelState.prototype.check_collision = function (object) {
    // Criamos um retangulo que vai corresponder à area de corte da fruta
    var object_rectangle, line1, line2, line3, line4, intersection;
    object_rectangle = new Phaser.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
    // verificamos insterseção da linha de corte com cada lado do retangulo atravez da função intersects que vai fazer a interseção entre as duas linhas
    line1 = new Phaser.Line(object_rectangle.left, object_rectangle.bottom, object_rectangle.left, object_rectangle.top);
    line2 = new Phaser.Line(object_rectangle.left, object_rectangle.top, object_rectangle.right, object_rectangle.top);
    line3 = new Phaser.Line(object_rectangle.right, object_rectangle.top, object_rectangle.right, object_rectangle.bottom);
    line4 = new Phaser.Line(object_rectangle.right, object_rectangle.bottom, object_rectangle.left, object_rectangle.bottom);
    intersection = this.swipe.intersects(line1) || this.swipe.intersects(line2) || this.swipe.intersects(line3) || this.swipe.intersects(line4);
    if (intersection) {
        //Se existir uma interseção exibimos as particulas realtivas ao corte
        object.cut();
        this.corte.play();
    }
};


//Inicializar o ecran de jogo (Pontuação e Vidas)
FruitNinja.LevelState.prototype.init_hud = function () {
    //Variaveis e posicao para a pontuação e vidas.
    var score_position, score_style, score, lives_position, lives;

    // Exibir Pontuação
    //Posição
    score_position = new Phaser.Point(20, 20);
    //Estilo do texto
    score_style = {font: "48px Arial", fill: "#fff"};
    //Desenhar texto
    score = new FruitNinja.Score(this, "score", score_position, {text: "Frutas: ", style: score_style, group: "hud"});

    
    //Exibir vidas (Cada jogador possui três vidas iniciais)
    //Posição 
    lives_position = new Phaser.Point(this.game.world.width-480, 30);
    //Desenhar três vidas iniciais com um espacamento de 40
    lives = new FruitNinja.Lives(this, "lives", lives_position, {texture: "life_image", group: "hud", "lives": 3, "lives_spacing": 60});

    
};


//Fim de jogo
FruitNinja.LevelState.prototype.game_over = function () {

    //Exibimos um painel de game over que vai conter a pontuação adquirida bem como a pontuação mais alta até ao momento
    //Declaramos variáveis para o painel
    var game_over_panel, game_over_position, game_over_bitmap, panel_text_style;

    // Se o score conseguido for maior que o maior score gravado atualizamos-o
    //O highscore é gravado no local storage
    if (!localStorage.highest_score || this.score > localStorage.highest_score) {
        localStorage.highest_score = this.score;
    }
    
    // Criamos um bitmap para mostra o respetivo painel
    game_over_position = new Phaser.Point(0, this.game.world.height);
    game_over_bitmap = this.add.bitmapData(this.game.world.width, this.game.world.height);
    game_over_bitmap.ctx.fillStyle = "#000";
    game_over_bitmap.ctx.fillRect(0, 0, this.game.world.width, this.game.world.height);
    // Estilo de texto do painel
    panel_text_style = {game_over: {font: "32px Arial", fill: "#FFF"},
                       current_score: {font: "20px Arial", fill: "#FFF"},
                       highest_score: {font: "18px Arial", fill: "#FFF"}};
    // Criação do painel de game over através do seu respetivo construtor com o respetivo estilo e uma duração de 500 segundos
    game_over_panel = new FruitNinja.GameOverPanel(this, "game_over_panel", game_over_position, {texture: game_over_bitmap, group: "hud", text_style: panel_text_style, animation_time: 500});
    this.groups.hud.add(game_over_panel);

    //Paramos a música e exibimos um som de game over
    this.gameover.play();
    this.musica.stop();
};

//Função para reniciar o jogo
FruitNinja.LevelState.prototype.restart_level = function () {
    this.game.state.restart(true, false, this.level_data);
    
};

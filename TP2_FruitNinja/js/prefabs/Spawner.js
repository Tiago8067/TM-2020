var FruitNinja = FruitNinja || {};

//Contrutor do spawner que vai servir para "atirar tanto as bombas como frutas para o ecran"
FruitNinja.Spawner = function (game_state, name, position, properties) {
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    //Criamos uma pool de objetos para agrupar todos os objetos (Tanto bombas como frutas)
    this.pool = this.game_state.groups[properties.pool];
    
    this.spawn_time = properties.spawn_time;
    
    this.velocity_x = properties.velocity_x;
    this.velocity_y = properties.velocity_y;
    
    this.spawn_timer = this.game_state.time.create();
    this.schedule_spawn();
};

//Associar objeto ao construtor
FruitNinja.Spawner.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Spawner.prototype.constructor = FruitNinja.Spawner;

//Gestão do spawn
FruitNinja.Spawner.prototype.schedule_spawn = function () {
    var time;
    // Estebecer um tempo aleatório entre cada spawn contido num determinado limite
    time = this.game_state.rnd.between(this.spawn_time.min, this.spawn_time.max);
    this.spawn_timer.add(Phaser.Timer.SECOND * time, this.spawn, this);
    this.spawn_timer.start();
};

//Spawn dos objetos
FruitNinja.Spawner.prototype.spawn = function () {
    var object_name, object_position, object, object_velocity;
    // Obter uma nova posição e velocidade
    object_position = new Phaser.Point
    (this.game_state.rnd.between(0.2 * this.game_state.game.world.width, 0.7 * this.game_state.game.world.width), this.game_state.game.world.height);
    object_velocity = this.object_velocity();
    // Obtemos o primeiro objeto a cair ou ser cortado
    object = this.pool.getFirstDead();
    if (!object) {
        // Se não existir nenhum criamos um novo
        object_name = "object_" + this.pool.countLiving();
        object = this.create_object(object_name, object_position, object_velocity);
    } else {
        // se exisitir adicionamos outro mais uma vez com uma posição e velocidade aleatorias.
        object.reset(object_position.x, object_position.y, object_velocity);
    }
    
    // Definir próximo spawn
    this.schedule_spawn();
};

//Função para definir velocidade dos objetos
FruitNinja.Spawner.prototype.object_velocity = function () {
    var velocity_x, velocity_y;
    // Gerar uma velocidade aleatoria entre um determinado limite
    velocity_x = this.game_state.rnd.between(this.velocity_x.min, this.velocity_x.max);
    velocity_y = this.game_state.rnd.between(this.velocity_y.min, this.velocity_y.max);
    return new Phaser.Point(velocity_x, velocity_y);
};
const { ObjectOverride,ObjTable } = require('./ClassOverride');

class SpawnOverride extends ObjectOverride{

    Update(){
        console.log(this.orig.id);
        this.orig.spawnCreep([WORK, CARRY, MOVE], 'Worker1');
    }
}

class SpawnTable extends ObjTable{

    constructor(){
        super(Game.spawns);
    }

    InitSingleObject(orig){
        return new SpawnOverride(orig);
    }
}

module.exports = {
    SpawnOverride,
    SpawnTable
}
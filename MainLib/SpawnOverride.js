const { ObjectOverride,ObjTable } = require('./ClassOverride');
const {} = require('./CreepProductionControl');
const {} = require('./StructureOverride');

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

const spawnTable = new SpawnTable();

module.exports = {
    spawnTable,
    SpawnOverride,
    SpawnTable
}
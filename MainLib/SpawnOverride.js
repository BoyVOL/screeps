const { ObjectOverride,HtableOverride,ObjTable } = require('./ClassOverride');

class SpawnOverride extends ObjectOverride{
    Update(){
        console.log("Update");
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
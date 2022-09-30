const { ObjectOverride,HtableOverride,ObjTable } = require('./ClassOverride');

class SpawnOverride extends ObjectOverride{

}

class SpawnTable extends ObjTable{

    constructor(){
        super(Game.spawns);
    }

}

module.exports = {
    SpawnOverride,
    SpawnTable
}
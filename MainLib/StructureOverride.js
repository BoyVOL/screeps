const { ObjectOverride,ObjTable } = require('./ClassOverride');

class StructureOverride extends ObjectOverride{

    Update(){
        console.log(this.orig.hits);
    }
}

class StructureTable extends ObjTable{

    constructor(){
        super(Game.spawns);
    }

    InitSingleObject(orig){
        return new StructureOverride(orig);
    }
}

const structTable = new StructureTable(Game.structures);

module.exports = {
    structTable,
    StructureOverride,
    StructureTable,
}
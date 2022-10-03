const { ObjectOverride,ObjTable } = require('./ClassOverride');

class StructureOverride extends ObjectOverride{

    Update(){
        super.Update();
        console.log(this.orig.hits);
    }
}

class StructureTable extends ObjTable{

    constructor(){
        super(Game.structures);
    }

    InitSingleObject(orig){
        return new StructureOverride(orig);
    }
}

const structTable = new StructureTable();

module.exports = {
    structTable,
    StructureOverride,
    StructureTable,
}
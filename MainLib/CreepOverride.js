const { ObjectOverride,ObjTable } = require('./ClassOverride');

class CreepOverride extends ObjectOverride{

    Update(){
        console.log("creep ",this.orig.id);
    }
}

class CreepTable extends ObjTable{

    constructor(){
        super(Game.creeps);
    }

    InitSingleObject(orig){
        return new CreepOverride(orig);
    }
}

module.exports = {
    CreepOverride,
    CreepTable
}
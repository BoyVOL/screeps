const { ObjectOverride,ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');

class CreepOverride extends ObjectOverride{

    constructor(orig){
        super(orig)
        this.MoveContr = new Movement();
    }

    Update(){
        super.Update();
        this.MoveContr.Update();
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

const creepTable = new CreepTable();

module.exports = {
    creepTable,
    CreepOverride,
    CreepTable
}
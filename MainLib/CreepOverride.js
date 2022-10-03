const { ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(origTable,origKey){
        super(origTable,origKey);
        this.MoveContr = new Movement(this);
    }

    Update(){
        super.Update();
        var pos = this.Room.GetRandomPos();
        this.MoveContr.path.value = this.FindPath(pos);
        this.MoveContr.Update();
        console.log("creep ",this.orig.id);
    }
}

class CreepTable extends ObjTable{

    constructor(){
        super(Game.creeps);
    }

    InitSingleObject(origTable,origKey){
        return new CreepOverride(origTable,origKey);
    }
}

const creepTable = new CreepTable();

module.exports = {
    creepTable,
    CreepOverride,
    CreepTable
}
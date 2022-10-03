const { ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig)
        this.MoveContr = new Movement(this);
    }

    Update(){
        super.Update();
        var pos = this.Room.GetRandomPos();
        console.log("first",this.MoveContr.path.value[0]);
        this.MoveContr.path.value = this.FindPath(pos);
        console.log("second",this.MoveContr.path.value[0]);
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
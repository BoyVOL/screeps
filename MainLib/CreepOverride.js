const { ObjectOverride,ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { roomTable,RoomOverride,WithPosition } = require('./RoomsOverride')

class CreepOverride extends WithPosition{

    constructor(orig){
        super(orig)
        this.MoveContr = new Movement(this);
        this.Room = roomTable.SearchByName(this.orig.room.name);
    }

    Update(){
        super.Update();
        this.MoveContr.Update();
        console.log("creep ",this.orig.id);
        console.log("pos = ",this.Room.GetRandomPos());
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
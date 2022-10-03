const { ObjectOverride,ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { roomTable,RoomOverride } = require('./RoomsOverride')

class CreepOverride extends ObjectOverride{

    constructor(orig){
        super(orig)
        this.MoveContr = new Movement();
        this.Room = roomTable.SearchByName(this.orig.room.name);
    }

    Update(){
        super.Update();
        this.MoveContr.Update();
        console.log("creep ",this.orig.id);
        console.log("pos = ",Math.floor(Math.random()*50));
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
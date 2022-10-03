const { ObjTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
        this.MoveContr = new Movement(this);
    }

    Update(){
        super.Update();
        var pos = this.Room.GetRandomPos();
        if(this.MoveContr.PathIsComplete) {
            console.log("need new path");
            this.MoveContr.GetNewPath(pos);
        }
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
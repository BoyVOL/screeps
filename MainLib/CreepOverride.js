const { ObjProxyTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
        this.MoveContr = new Movement(this);
    }

    Update(){
        super.Update();
        if(this.MoveContr.PathIsComplete) {
            console.log(this.MoveContr.path.value.length);
            this.MoveContr.target.value = this.Room.GetRandomPos();
        }
        this.MoveContr.Update();
    }
}

class CreepTable extends ObjProxyTable{

    constructor(){
        super(Game.creeps);
    }
    
    LoadOrig(){
        this.orig = Game.creeps;
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
const { ObjProxyTable } = require('./ClassOverride');
const { Movement } = require('./MoveControl');
const { RoomObjectOver } = require('./RoomsOverride');
const { TaskExecuter } = require('./TaskManager');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
        this.MoveContr = new Movement(this);
        this.taskExecuter = new TaskExecuter(this);
    }

    Update(){
        super.Update();
        this.taskExecuter.Update();
        console.log(this.taskExecuter.activeTaskId);
        if(this.MoveContr.PathIsComplete) {
            this.MoveContr.target = this.Room.GetRandomPos();
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

    Update(){
        super.Update();
    }
}

const creepTable = new CreepTable();

module.exports = {
    creepTable,
    CreepOverride,
    CreepTable
}
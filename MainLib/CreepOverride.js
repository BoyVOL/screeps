const { ObjProxyTable } = require('./ClassOverride');
const { ActionTable } = require('./ActionControl');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
        this.actionTable = new ActionTable(this);
    }

    LoadOrig(){
        super.LoadOrig();
        this.actionTable.LoadOrig();
    }

    Update(){
        super.Update();
        this.actionTable.Update();
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
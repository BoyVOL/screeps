const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class CreepOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
    }

    Update(){
        super.Update();
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
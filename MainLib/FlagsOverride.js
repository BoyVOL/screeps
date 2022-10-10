const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class FlagOverride extends RoomObjectOver{

}

class FlagTable extends ObjProxyTable{

    constructor(){
        super(Game.flags);
    }
    
    LoadOrig(){
        this.orig = Game.flags;
    }

    InitSingleObject(orig){
        console.log(orig.name);
        return new FlagOverride(orig);
    }
}

const flagTable = new FlagTable();

module.exports = {
    FlagOverride,
    FlagTable,
    flagTable
}
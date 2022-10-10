const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class FlagOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
    }
}

class ResourceFlag extends FlagOverride{

    Update(){
        super.Update();
        console.log("Resource");
    }

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
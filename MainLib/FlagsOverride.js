const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class FlagOverride extends RoomObjectOver{

    static className = "Base";

    constructor(orig){
        super(orig);
    }

    static GetName(pos){
        return this.className+"_"+pos;
    }
}

class ResourceFlag extends FlagOverride{

    static className = "Res";

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
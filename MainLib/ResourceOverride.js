const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class ResourceTable extends ObjProxyTable{

    ResTable(){
        
    }

    constructor(){
        super(Game.structures);
    }
    
    LoadOrig(){
        this.orig = Game.structures;
    }

    InitSingleObject(orig){
        return new StructureOverride(orig);
    }
}
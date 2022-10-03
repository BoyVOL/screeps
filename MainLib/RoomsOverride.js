const { ObjectOverride,ObjTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    Update(){
        super.Update();
        console.log(this.orig.name);
    }
}

class RoomsTable extends ObjTable{

    constructor(){
        super(Game.rooms);
    }

    InitSingleObject(orig){
        return new RoomOverride(orig);
    }

    SearchByName(name){
        var result = null;
        function search(val){
            console.log("begin search");
            if(val.orig.name == name){
                result = val
                console.log("found it!");
            } 
        }
        this.forEachObj(search);
        return result;
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
}
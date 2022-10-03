const { ObjectOverride,ObjTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    Update(){
        super.Update();
        console.log(this.orig.name);
    }

    GetRandomPos(){
        var x = Math.floor(Math.random()*50);
        var y = Math.floor(Math.random()*50);
        return this.orig.getPositionAt(x,y);
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
            if(val.orig.name == name){
                result = val;
            } 
        }
        this.forEachObj(search);
        return result;
    }
}

class WithPosition extends ObjectOverride{

    constructor(orig){
        super(orig);
        this.Room = roomTable.SearchByName(this.orig.room.name);
        console.log(this.Room.orig.name);
    }

}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
    WithPosition,
}
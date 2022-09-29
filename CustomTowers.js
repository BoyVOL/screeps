var CO = require('CustomObjects');

class CustomTower extends CO.CustomObject{
    constructor(objectId){
        super(objectId);
    }
    
    //Function for updating state of object
    Update(){
        super.Update();
    }
    
    FindBuildingsToRep(){
        var result =  this.Native().room.find(FIND_STRUCTURES,
        {filter: item => ((item.structureType == STRUCTURE_ROAD && item.hitsMax - item.hits > 800) || 
        (item.structureType == STRUCTURE_WALL && item.hits <= 100000) ||
        (item.structureType == STRUCTURE_RAMPART && item.hits <= 100000) ||
        (item.structureType != STRUCTURE_WALL && item.structureType != STRUCTURE_ROAD && item.structureType != STRUCTURE_RAMPART && item != this.Native() && item.hits < item.hitsMax))}
        );
        return result;
    }
    
    FindTargetToHeal(){
        return this.Native().room.find(FIND_MY_CREEPS,
        {filter: item => item.hits < item.hitsMax}
        );
    }
    
    Update(){
        super.Update();
        var target = this.Native().pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target != null){
            this.Native().attack(target);
            return;
        }
        var target = this.Native().pos.findClosestByRange(this.FindTargetToHeal());
        if(target != null){
            this.Native().heal(target);
            return;
        }
        var target = this.Native().pos.findClosestByRange(this.FindBuildingsToRep());
        if(target != null){
            this.Native().repair(target);
            return;
        }
    }
}

class TowerStorer extends CO.ObjectStorer{
    
    SetHashTable(hashTable){
        this.hashTable = _.filter( Game.structures, struct => struct.structureType == STRUCTURE_TOWER );
    }
    
    //Function for overriding what object this storer returns
    GetObject(id){
        return new CustomTower(id);
    }
}

module.exports = {
    CustomTower,
    TowerStorer
};
var CO = require('CustomObjects');
var CC = require('CustomCreeps');

class Buildorders {
}

//Spawn wrapper class
class CustomSpawn extends CO.CustomObject{
    
    //Constructor of the object
    constructor(objectId){
        super(objectId);
        this.InitMemField("BuildId",0);
        this.Buildorder = [];
        this.SetBuildorder();
        this.MinimalCreepCount = 4;
        this.HadMinimumCreeps = true;
    }
    
    NoMoreMinimal(){
        return this.HadMinimalCreeps && this.GetCreepCount() >= this.MinimalCreepCount;
    }
    
    GetBuildorder(){
        var result = [];
        var HasStorage = this.GetStorageCount() > 0;
        var HasBuildingSites = this.GetSitesCount();
        var HasRoads = this.GetRoadCount();
        var HasTowers = _.filter( Game.structures, struct => struct.structureType == STRUCTURE_TOWER ).length > 0;
        var HasEnergyHarvestFlags = this.FindFlags("Energy_harvest");
        if(HasStorage){
            result = [CC.EnergyStorageFiller,CC.EnergyStorageEmptier,CC.Attacker];
            if(this.GetCreepCount() >= this.MinimalCreepCount){
                if(HasBuildingSites){
                    result = result.concat([CC.EnergyStorageFiller,CC.BuilderFromStorage]);
                }
                if(HasRoads && !HasTowers){
                    result = result.concat([CC.EnergyStorageFiller,CC.RoadRepFromStorage]);
                }
                if(HasEnergyHarvestFlags){
                    result = result.concat([CC.EnergyDistantMiner]);
                }
            }
        } else {
            result = [CC.EnergyCarrier,CC.EnergyCarrier,CC.Attacker];
            if(this.GetCreepCount() >= this.MinimalCreepCount){
                if(HasBuildingSites){
                    result = result.concat([CC.Builder,CC.EnergyCarrier]);
                }
                if(HasRoads && !HasTowers){
                    result = result.concat([CC.RoadRep,CC.EnergyCarrier]);
                }
            }
        }
        return result;
    }
    
    IamASpawn(){
        return "Yep, this is a spawn";
    }
    
    //Metod for incrementint buildorder id
    MoveId(id){
        var NewID = id;
        NewID ++;
        if(NewID >= this.Buildorder.length){
            NewID = 0;
        }
        return NewID;
    }
    
    GetExtensions(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_EXTENSION)});
    }
    
    GetStorageCount(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_STORAGE)}).length;
    }
    
    GetCreepCount(){
        return this.Native().room.find(FIND_MY_CREEPS).length;
    }
    
    GetSitesCount(){
        return this.Native().room.find(FIND_MY_CONSTRUCTION_SITES).length;
    }
    
    GetRoadCount(){
        return this.Native().room.find(FIND_STRUCTURES,
        {filter: item => item.structureType == STRUCTURE_ROAD}
        ).length;
    }
    
    GetTechLevel(){
        if(this.GetCreepCount() < this.MinimalCreepCount){
            return 0;
        }
        var extensionlength = this.GetExtensions().length;
        switch (true) {
            case (extensionlength >= 5 && extensionlength < 10):
                return 1;
                break;
            
            case (extensionlength >= 10 && extensionlength < 20):
                return 2;
                break;
            
            case (extensionlength >= 20):
                return 3;
                break;
            
            default:
                return 0;
        }
    }
    
    ShowSpawnType(){
        var names = [];
        for (var item in this.Buildorder) {
            names.push(this.Buildorder[item].name);
        }
        this.DrawText("BuildOrder = "+names,
        this.Native().pos.x+1,
        this.Native().pos.y,
        {align: 'left', opacity: 0.8, font: "bold 0.4 Calibri", color: "#03A062", stroke: "#000000", strokeWidth: 0.1});
        this.DrawText("Spawn id = "+this.MoveId(this.Native().memory.BuildId)+" Tech level = "+this.GetTechLevel(),
        this.Native().pos.x+-1,
        this.Native().pos.y,
        {align: 'right', opacity: 0.8, font: "bold 0.4 Calibri", color: "#03A062", stroke: "#000000", strokeWidth: 0.1});
    }
    
    //Metod for setting current buildorder
    SetBuildorder(){
        this.Buildorder = this.GetBuildorder();
    }
    
    //Metod for checking if spawner may start spawning new creep
    ReadyToSpawn(){
        return this.Native().spawnCreep(this.Buildorder[this.MoveId(this.Native().memory.BuildId)].Body()[this.GetTechLevel()],
        Game.time,{memory : {'type' : this.Buildorder[this.MoveId(this.Native().memory.BuildId)].name}, dryRun : true }) == 0;
    }
    
    //Metod for trying to spawn a new creep
    TrySpawn(){
        if(this.ReadyToSpawn()){
            this.Native().memory.BuildId = this.MoveId(this.Native().memory.BuildId);
            var tech = Math.min(this.Buildorder[this.Native().memory.BuildId].Body().length-1,this.GetTechLevel());
            this.Native().spawnCreep(this.Buildorder[this.Native().memory.BuildId].Body()[tech],Game.time,{memory : {'type' : this.Buildorder[this.Native().memory.BuildId].name}});
        }
    }
    
    Update(){
        super.Update();
        this.SetBuildorder();
        this.TrySpawn();
        this.ShowSpawnType();
        this.HadMinimalCreeps = this.GetCreepCount() < this.MinimalCreepCount;
    }
}

//Class for storing spawns
class SpawnStorer extends CO.ObjectStorer{
    
    SetHashTable(hashTable){
        this.hashTable = Game.spawns;
    }
    
    //Function for overriding what object this storer returns
    GetObject(id){
        return new CustomSpawn(id);
    }
}
    
module.exports = {
    CustomSpawn,
    SpawnStorer,
};
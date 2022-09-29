var CO = require('CustomObjects');
var Rand = require('CustomRandom');
var _ = require('lodash');
var Consts = require('Constants');

//Spawn wrapper class
class CustomCreep extends CO.CustomObject{
    //Constructor of the object
    constructor(objectId){
        super(objectId);
        this.InitMemField("Task",null);
        this.stillCount = 0
        this.MovePath = null;
        this.MoveTarget = null;
        this.PrevPos = null;
        this.PrevRoom = null;
    }
    
    //static metod that returns constants that will be used to detect actions, assigned to this creep
    static Actions(){
        return Consts.Actions;
    }
    
    ShowClass(){
        this.DrawText(this.constructor.name,
        this.Native().pos.x,
        this.Native().pos.y+1,
        {align: 'center', opacity: 0.8, font: "bold 0.4 Calibri", color: "#03A062", stroke: "#000000", strokeWidth: 0.1});
    }
    
    //Metod that returns this class's body composition
    static Body(){
        return [];    
    }
    
    //Metod for storing tasks in memory
    SetTask(target,action,resource){
        this.Native().memory.Task = {
            'target' : target,
            'action' : action,
            'resource' : resource,
            'path' : null,
        }
    }
    
    PickOne(array,logarithmic){
        var id;
        id =  Math.random()*array.length;
        if(typeof(array[Math.trunc(id)]) != 'undefined'){
            return array[Math.trunc(id)].id;
        }
        return null;
    }
    
    PickName(array,logarithmic){
        var id;
        id =  Math.random()*array.length;
        if(typeof(array[Math.trunc(id)]) != 'undefined'){
            return array[Math.trunc(id)].name;
        }
        return null;
    }
    
    //Metod for translating target records in memory into Room.position objects
    TargetToPosition(){
        return new RoomPosition(this.Native().memory.Task.target.x,this.Native().memory.Task.target.y,this.Native().memory.Task.target.roomName);
    }
    
    //Metod for returning object in world's db based on id stored in creep memory
    GetTargetObj(){
        return Game.getObjectById(this.Native().memory.Task.target);
    }
    
    //Set target this creep should move to
    SetMoveTarget(pos){
        this.MoveTarget = pos;
        this.MovePath = this.Native().pos.findPathTo(pos);
        this.stillCount = 0;
    }
    
    //Unset current move target
    ClearMoveTarget(){
        this.MoveTarget = null;
        this.MovePath = null;
        this.stillCount = 0;
    }
    
    //Check if position in parameter is actually a target this creep is moving to
    IsMoveTarget(pos){
        return this.MoveTarget != null && this.MoveTarget.isEqualTo(pos);
    }
    
    //Check if previous position of this creep is equal to current one
    IsStandingStill(){
        return(this.MoveTarget != null && this.PrevPos != null && this.PrevPos.isEqualTo(this.Native().pos));
    }
    
    //Check if previous position of this creep is equal to current one
    IsInOtherRoom(){
        return(this.MoveTarget != null && this.PrevRoom != null && this.PrevRoom != this.Native().room.name);
    }
    
    //Metod for moving alongside selected path to current target. If creep finds homself standing still for 3 ticks, he will recalculate path
    MoveTo(pos){
        if(!this.IsMoveTarget(pos)){
            this.SetMoveTarget(pos);
        }
        if(this.IsInOtherRoom()){
            this.SetMoveTarget(pos);
        }
        var error = this.Native().moveByPath(this.MovePath);
        if(error != ERR_TIRED && this.IsStandingStill()){
            this.stillCount ++;
        }
        if(this.stillCount >= 2){
            this.SetMoveTarget(pos);
        }
        this.PrevPos = this.Native().pos;
        this.PrevRoom = this.Native().room.name;
    }
    
    DrawPath(){
        this.Native().room.visual.poly(this.MovePath, {lineStyle: 'dashed', stroke: "#03A062", strokeWidth: 0.2});
    }
    
    //Metod for executing move task
    Move(){
        this.MoveTo(this.TargetToPosition());
        if(this.Native().pos.getRangeTo(this.TargetToPosition()) <= 1){
            this.ClearTask();
        }
    }
    
    //metod for checking if task target still exists
    TargetExists(){
        return Game.getObjectById(this.Native().memory.Task.target) != null;
    }
    
    CheckTaskType(type){
        var ActualTask = this.Native().memory.Task;
        return ActualTask != null && ActualTask.action == type;
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.move)){
            this.Move();
            return;
        }
    }
    
    HasTask(){
        return this.Native().memory.Task != null;
    }
    
    ClearTask(){
        this.Native().memory.Task = null;
        this.ClearMoveTarget();
    }
    
    //Returns The cost of spawning this creep
    static GetSpawnEnergy(){
        var result = 0;
        for (var i = 0; i < this.Body().length; i++) {
           result+= BODYPART_COST[this.Body()[i]];
        }
        return result;
    }
    
    static ExtractTypes(body){
        var result = [];
        for (var i = 0; i < body.length; i++) {
            result.push(body[i].type);
        }
        return result;
    }
    
    Update(){
        super.Update();
        this.ExecuteTask();
        this.DrawPath();
        this.ShowClass();
    }
}

class Worker extends CustomCreep{
    
    constructor(objectId){
        super(objectId);
    }
    
    Harvest(){
        super.Harvest();
    }
    
    FindResource(){
        return [];
    }
    
    FindDestination(){
        return [];
    }
    
    Resource(){
        return null
    }
    
    Harvest(){
        var target = this.GetTargetObj();
            if(this.Native().pos.getRangeTo(target.pos) <= 1){
                if(this.Native().store.getFreeCapacity() >= 1){
                    var result = this.Native().harvest(target);
                    if(result != 0 && result != -11){
                        this.ClearTask();
                    }
                } else {
                    this.ClearTask();
                }
            } else {
                this.MoveTo(target.pos);
            }
    }
    
    TargetIsFull(ResType){
        var target = this.GetTargetObj();
        return typeof(target.store) != "undefined" && target.store.getFreeCapacity(ResType) <= 0;
    }
    
    Carry(){
        var target = this.GetTargetObj();
        if(this.Native().pos.getRangeTo(target.pos) <= 1){
            if(this.Native().transfer(target,this.Native().memory.Task.resource) < 0){
                this.ClearTask();
            }
        } else {
            this.MoveTo(target.pos);
        }
    }
    
    DefendingIfNessesary(){
        if(this.Native().room.find(FIND_HOSTILE_CREEPS).length > 0 && 
        this.Native().room.find(FIND_MY_STRUCTURES, {filter: item => item.structureType == STRUCTURE_TOWER}).length > 0){
            return this.GetTargetObj().structureType == STRUCTURE_TOWER
        }
        return true;
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.harvest)){
            if(this.TargetExists()){
                this.Harvest();
            } else {
                this.ClearTask();
            }
            return;
        }
        if(this.CheckTaskType(Consts.Actions.carry)){
            if(this.TargetExists()){
                this.Carry();
            } else {
                this.ClearTask();
            }
            return;
        }
        super.ExecuteTask();
    }
    
    GetAckuireType(){
        return Consts.Actions.harvest;
    }
    
    Update(){
        if(!this.HasTask()){
            var src = this.PickOne(this.FindResource());
            if(src != null && this.Native().store.getUsedCapacity() < 1){
                this.SetTask(src,this.GetAckuireType(),this.Resource());
            }
            var dest = this.PickOne(this.FindDestination());
            if(dest != null && this.Native().store.getUsedCapacity() >= 1){
                this.SetTask(dest,Consts.Actions.carry,this.Resource());
            }
        } else {
            this.Native().memory.Task.resource = this.Resource();
        }
        super.Update();
    }
}

class Defender extends CustomCreep{
    
    constructor(objectId){
        super(objectId);
    }
    
    static Body(){
        return [
            [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK],
            [TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK],
            [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK],
            [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
            ];
    }
    
    FindDefendTargets(){
        return this.Native().pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    }
    
    Defend(){
        var target = this.FindDefendTargets();
        if(target != null){
            if(this.Native().pos.getRangeTo(target.pos) <= 1){
                var result = this.Native().attack(target);
                if(result != 0){
                    this.ClearTask();
                }
            } else {
                this.MoveTo(target.pos);
            }
        } else {
            this.ClearTask();
        }
        
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.defend)){
            this.Defend();
            return;
        }
        super.ExecuteTask();
    }
    
    Update(){
        if(!this.HasTask()){
            this.SetTask(null,Consts.Actions.defend);
        }
        super.Update();
    }
}

class Attacker extends Defender{
    FindDefendTargets(){
        if(this.Native().room.controller.my){
            return this.Native().pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }
        var allEnemies = this.Native().room.find(FIND_HOSTILE_CREEPS).concat(this.Native().room.find(FIND_HOSTILE_STRUCTURES));
        return this.Native().pos.findClosestByRange(allEnemies);
    }
    
    Update(){
        if(!this.HasTask()){
            this.SetTask(null,Consts.Actions.defend);
        }
        super.Update();
    }
}


class EnergyCarrier extends Worker{
    constructor(objectId){
        super(objectId);
    }
    
    static Body(){
        return [
            [MOVE,CARRY,WORK,CARRY,MOVE],
            [MOVE,CARRY,WORK,CARRY,MOVE,MOVE,WORK,CARRY],
            [MOVE,CARRY,WORK,CARRY,MOVE,MOVE,WORK,CARRY,WORK,MOVE,CARRY,WORK],
            [MOVE,CARRY,WORK,CARRY,MOVE,MOVE,WORK,CARRY,WORK,MOVE,CARRY,WORK,MOVE,WORK,CARRY,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE],
            ];
    }
    
    FindResource(){
        return this.DistanceSort(this.Native().room.find(FIND_SOURCES_ACTIVE));
    }
    
    FindDestination(){
        var result = this.Native().room.find(FIND_MY_STRUCTURES,
        {filter: item => !(typeof(item.store) == 'undefined' || item.store.getFreeCapacity(this.Resource()) <= 0 || item.structureType == STRUCTURE_EXTENSION )});
        var extension = this.Native().pos.findClosestByRange(FIND_MY_STRUCTURES,{filter: item => item.structureType == STRUCTURE_EXTENSION && item.store.getFreeCapacity(this.Resource()) > 0});
        if(extension != null) {
            result.push(extension);
            result.push(extension);
            result.push(extension);
            result.push(extension);
            result.push(extension);
            result.push(extension);
            result.push(extension);
        }
        if(this.Native().store.getCapacity() < 100 || this.Native().store.getUsedCapacity() < (this.Native().store.getCapacity() / 100 * 90)){
            result.push(this.Native().room.controller);
        } 
        if(this.Native().room.find(FIND_HOSTILE_CREEPS).length > 0){
            var towers = this.Native().room.find(FIND_MY_STRUCTURES,
            {filter: struct => struct.structureType == STRUCTURE_TOWER});
            if (towers.length > 0)
            result = towers;
        }
        return result;
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.carry)){
            if(!this.DefendingIfNessesary()){
                this.ClearTask();
            }
        }
                    console.log("taskToBuild");
        super.ExecuteTask();
    }
    
    Resource(){
        return RESOURCE_ENERGY;
    }
}

class EnergyStorageFiller extends EnergyCarrier{
    
    GetStorages(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_STORAGE)});
    }
    
    FindDestination(){
        var result = this.GetStorages();
        if((result[0].store[RESOURCE_ENERGY]/100) <= 0.2){
            return this.DistanceSort(result);
        } else {
            return super.FindDestination();
        }
    }
}

class DistantMiner extends EnergyStorageFiller{
    
    GetFlag(){
        return Game.flags[this.Native().memory.Task.target];
    }
    
    FlagExists(){
        return typeof(Game.flags[this.Native().memory.Task.target]) != 'undefined' && Game.flags[this.Native().memory.Task.target] != null;
    }
    
    GetResourceUnderTarget(target){
        return target.pos.lookFor(LOOK_SOURCES);
    }
    
    DistantHarvest(){
        var target = this.GetFlag();
        if(this.Native().pos.getRangeTo(target.pos) <= 1){
            if(this.Native().store.getFreeCapacity() >= 1){
                var result = this.Native().harvest(this.GetResourceUnderTarget(target)[0]);
                if(result != 0 && result != -11){
                    this.ClearTask();
                }
            } else {
                this.ClearTask();
            }
        } else {
            this.MoveTo(target.pos);
        }
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.distantHarvest)){
            if(this.FlagExists()){
                this.DistantHarvest();
            } else {
                this.ClearTask();
            }
            return;
        }
        super.ExecuteTask();
    }
}

class EnergyDistantMiner extends DistantMiner{
    
    static Body(){
        return [
            [MOVE,CARRY,WORK,CARRY,MOVE],
            [MOVE,CARRY,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY],
            [MOVE,CARRY,MOVE,MOVE,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,MOVE,CARRY,WORK],
            [MOVE,CARRY,MOVE,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY,MOVE,MOVE,MOVE,CARRY,WORK,MOVE,WORK,CARRY,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE],
            ];
    }
    
    GetAllStorages(){
        return _.filter( Game.structures, struct => struct.structureType == STRUCTURE_STORAGE );
    }
    
    FindDestination(){
        var result = this.GetAllStorages();
        console.log(result);
        return this.DistanceSort(result);
    }
    
    Update(){
        if(!this.HasTask()){
            var flags = this.FindFlags("Energy_harvest");
            if(flags.length > 0){
                var dest = this.PickName(flags);
                if(dest != null && this.Native().store.getUsedCapacity() < 1){
                    this.SetTask(dest,Consts.Actions.distantHarvest,this.Resource());
                }
            }
        }
        super.Update();
    }
}

class Withdrawer extends EnergyCarrier{
    Withdraw(){
        var target = this.GetTargetObj();
        if(this.Native().pos.getRangeTo(target.pos) <= 1){
            if(this.Native().withdraw(target,this.Native().memory.Task.resource) < 0){
                this.ClearTask();
            }
        } else {
            this.MoveTo(target.pos);
        }
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.withdraw)){
            if(this.TargetExists()){
                this.Withdraw();
            } else {
                this.ClearTask();
            }
            return;
        }
        super.ExecuteTask();
    }
}

class EnergyStorageEmptier extends Withdrawer{
    
    static Body(){
        return [
            [MOVE,CARRY,WORK,CARRY,MOVE],
            [MOVE,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,WORK],
            [MOVE,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,WORK],
            [MOVE,CARRY,MOVE,CARRY,CARRY,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,WORK,WORK],
            ];
    }
    
    GetStorages(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_STORAGE)});
    }
    
    FindResource(){
        return this.DistanceSort(this.GetStorages());
    }
    
    FindDestination(){
        var result = super.FindDestination();
        return _.filter( result, struct => struct.structureType != STRUCTURE_STORAGE );
    }
    
    GetAckuireType(){
        return Consts.Actions.withdraw;
    }
}

class Repairer extends Withdrawer{
    
    FindStructsToRep(){
        return [];
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.repair)){
            if(this.TargetExists() && !this.TargetIsFullHp()){
                this.Repair();
            } else {
                this.ClearTask();
            }
            return;
        } 
        super.ExecuteTask();
    }
    
    Repair(){
        var target = this.GetTargetObj();
        if(this.Native().pos.getRangeTo(target.pos) <= 3){
            if(this.Native().repair(target) < 0){
                this.ClearTask();
            }
        } else {
            this.MoveTo(target.pos);
        }
    }
    
    TargetIsFullHp(){
        var target = Game.getObjectById(this.Native().memory.Task.target);
        return target.hits >= target.hitsMax;
    }
    
    Update(){
        if(!this.HasTask()){
            var structs = this.FindStructsToRep();
            if(structs.length > 0){
                var dest = this.PickOne(structs);
                if(dest != null && this.Native().store.getUsedCapacity() >= 1){
                    this.SetTask(dest,Consts.Actions.repair);
                }
            }
        }
        super.Update();
    }
}

class Builder extends Repairer{
    constructor(objectId){
        super(objectId);
    }
    
    FindSites(){
        var sites = this.Native().pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(sites != null) {
            return sites;
        } else {
            return [];
        }
    }
    
    FindStructsToRep(){
        var result = this.Native().pos.findClosestByRange(FIND_STRUCTURES,
        {filter: item => 
        (item.structureType == STRUCTURE_WALL && item.hits <= 100000) ||
        (item.structureType == STRUCTURE_RAMPART && item.hits <= 100000) ||
        (item.structureType != STRUCTURE_WALL && item.structureType != STRUCTURE_ROAD && item.structureType != STRUCTURE_RAMPART && item.hits < item.hitsMax)}
        );
        if(result != null){
            return result;
        } return [];
    }
    
    ExecuteTask(){
        if(this.CheckTaskType(Consts.Actions.build)){
            if(this.TargetExists()){
                this.Build();
            } else {
                this.ClearTask();
            }
            return;
        }
        super.ExecuteTask();
    }
    
    Build(){
        var target = this.GetTargetObj();
        if(this.Native().pos.getRangeTo(target.pos) <= 3){
            if(this.Native().build(target) < 0){
                this.ClearTask();
            }
        } else {
            this.MoveTo(target.pos);
        }
    }
    
    Update(){
        if(!this.HasTask()){
            var sites = this.FindSites();
            if(sites != null){
                var dest = sites.id;
                if(dest != null && this.Native().store.getUsedCapacity() >= 1){
                    this.SetTask(dest,Consts.Actions.build);
                }
            }
        }
        super.Update();
    }
}

class BuilderFromStorage extends Builder{
    
    GetStorages(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_STORAGE)});
    }
    
    FindResource(){
        return this.DistanceSort(this.GetStorages());
    }
    
    FindDestination(){
        var result = super.FindDestination();
        return _.filter( result, struct => struct.structureType != STRUCTURE_STORAGE );
    }
    
    GetAckuireType(){
        return Consts.Actions.withdraw;
    }
}

class RoadRep extends Repairer{
    constructor(objectId){
        super(objectId);
    }
    
    FindStructsToRep(){
        var result = this.Native().pos.findClosestByRange(FIND_STRUCTURES,
        {filter: item => item.structureType == STRUCTURE_ROAD && item.hitsMax - item.hits > 100}
        );
        if(result != null){
            return result;
        } return [];
    }
}

class RoadRepFromStorage extends RoadRep{
    
    GetStorages(){
        return this.Native().room.find(FIND_MY_STRUCTURES,{filter: object => (object.structureType == STRUCTURE_STORAGE)});
    }
    
    FindResource(){
        return this.DistanceSort(this.GetStorages());
    }
    
    FindDestination(){
        var result = super.FindDestination();
        return _.filter( result, struct => struct.structureType != STRUCTURE_STORAGE );
    }
    
    GetAckuireType(){
        return Consts.Actions.withdraw;
    }
}

class CreepStorer extends CO.ObjectStorer{
    
    SetHashTable(hashTable){
        this.hashTable = Game.creeps;
    }
    
    
    //Function for overriding what object this storer returns
    GetObject(id){
        var type = Game.getObjectById(id).memory.type;
        var classes = Object.keys(module.exports);
        for (var classId in classes) {
            var className = classes[classId];
            if(type == className) {
                return new module.exports[className](id);
            }
        }
    }
    
    //Looks at setted up hashtable and loads objects from it with their id's saved
    UpdateObjects(){
        super.UpdateObjects();
    }
}
    
module.exports = {
    CustomCreep,
    Defender,
    Attacker,
    CreepStorer,
    EnergyCarrier,
    Builder,
    RoadRep,
    EnergyStorageFiller,
    EnergyDistantMiner,
    EnergyStorageEmptier,
    BuilderFromStorage,
    RoadRepFromStorage,
};
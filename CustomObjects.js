

//Parent class for all objects
class CustomObject{
    
    //Constructor of the object
    constructor(objectId){
        this.objectId = objectId;
    }
    
    InitMemField(key,def){
        if(typeof(this.Native().memory[key]) == 'undefined'){
            this.Native().memory[key] = def;
        }
    }
    
    Native(){
        return Game.getObjectById(this.objectId);
    }
    
    DrawText(text, x,y,options){
        this.Native().room.visual.text(
            text, x,y, options);
    }
    
    //Function for updating state of object
    Update(){
    }
    
    FindFlags(FlagName){
        var result = _.filter(Game.flags, flag => flag.name.match(RegExp(FlagName+".*")) );
        return this.DistanceSort(result);
    }
    
    DistanceSort(collection){
        var result = _.sortBy(collection, item => this.Native().pos.getRangeTo(item.pos));
        return result;
    }
}

//Class for storing CustomObjects in global memory and loading them from hashtables
class ObjectStorer{
    
    //Constructor takes hashtable that needs to be monitored
    constructor(id){
        this.id = id;
        if(typeof(Memory[this.id]) == 'undefined'){
            Memory[this.id] = {};
        }
        this.Memory = Memory[this.id];
        this.hashTable = null;
        this.SetHashTable();
        this.Objects = {};
        this.InitObjects();
    }
    
    SetHashTable(hashTable){
        this.hashTable = null;
    }
    
    GetObject(id){
        return new CustomObject(id);
    }
    
    UpdateObject(object){
        
    }
    
    InitMemField(key,def){
        if(typeof(this.Memory[key]) == 'undefined'){
            this.Memory[key] = def;
        }
    }
    
    Debug(){
        return "HELLO";
    }
    
    Filter(id){
        return true;
    }
    
    ObjectExists(id){
        return (typeof(Game.getObjectById(id)) != 'undefined' && Game.getObjectById(id) != null);
    }
    
    InitObjects(){
        this.Objects = {};
        for(var item in this.hashTable){
            var id = this.hashTable[item].id;
            if(this.ObjectExists(id) && this.Filter(id)){
                this.Objects[id] = this.GetObject(id);
            }
        }
    }
    
    AddNew(){
        for(var item in this.hashTable){
            var id = this.hashTable[item].id;
            if(this.ObjectExists(id) && this.Filter(id) && !(id in this.Objects)){
                this.Objects[id] = this.GetObject(id);
            }
        }
    }
    
    ClearOld(){
        for(var item in this.Objects){
            if(!this.ObjectExists(item)) {
                delete this.Objects[item];
            }
        }
    }
    
    //Looks at setted up hashtable and loads objects from it with their id's saved
    UpdateObjects(){
        this.SetHashTable();
        this.AddNew();
        this.ClearOld();
        for(var item in this.Objects){
            this.Objects[item].Update();
        }
    }
}

module.exports = {
    CustomObject,
    ObjectStorer
};
class Updatable{

    constructor(){
        
    }
    
    Update(){
        
    }
}

class WithParent extends Updatable{
    constructor(parent){
        super();
        this.parent = parent;
    }
}


/** class for overriding functionality of different low level class */
class ObjectOverride extends Updatable{

    constructor(orig){
        super();
        this.orig = orig;
    }

    LoadFromMem(){
        this.orig = this.orig;
    }

    get hasid(){
        return typeof(this.orig.id) != 'undefined';
    }

    Update(){
        this.LoadFromMem();
        super.Update();
    }
}

/** class for overriding access to hash tables */
class HtableOverride extends ObjectOverride{

    /** this way you can get hash table overall count */
    get count(){
        return Object.keys(this.orig).length;
    }

    /** cycle for all items in table that gets function as a parameter */
    forEach(funct){
        for (const key in this.orig) {
            funct(this.orig[key],key);
        }
    }

    Exists(key){
        return this.orig[key] != undefined;
    }
}

/** object that wraps around native hash table and converts it into updating object array on the fly*/
class ObjTable extends HtableOverride{
    constructor(orig){
        super(orig);
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    AddObject(orig,key){
        var obj = this.InitSingleObject(orig);
        this.objArray[key] = obj;
    }

    DeleteObject(key){
        delete this.objArray[key];
    }

    /** Initiate all objects from hash table */
    InitObjects(){
        this.objArray = {};
        var pass = this;
        this.forEach(function(val,key){
            pass.AddObject(val,key);
        });
    }

    ObjExists(key){
        this.objArray[key] != undefined;
    }

    UpdateObjects(){
        var pass = this;
        this.forEach(function(val,key){
            if(!pass.ObjExists(key)){
                pass.AddObject(val,key);
            }
        });
        this.forEachObj(function(val,key){
            if(!pass.Exists(key)){
                pass.DeleteObject(key);
            }
        });
    }
    
    /** cycle for all items in table that gets function as a parameter */
    forEachObj(funct){
        for (const key in this.orig) {
            funct(this.objArray[key],key);
        }
    }

    Update(){
        super.Update();
        this.UpdateObjects();

        var funct = function(obj,key){
            obj.Update();
        }
        this.forEachObj(funct);
    }
}

module.exports = {
    Updatable,
    WithParent,
    HtableOverride,
    ObjectOverride,
    ObjTable,
}
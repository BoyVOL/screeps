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

    constructor(origTable,origkey){
        super();
        this.origTable = origTable;
        this.origKey = origkey;
        this.orig = null;
        this.Reupload();
    }
    
    Reupload(){
        this.orig = this.origTable[this.origKey];
    }

    Update(){
        this.Reupload();
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
}

/** object that wraps around native hash table and converts it into updating object array on the fly*/
class ObjTable extends HtableOverride{
    constructor(orig){
        super(orig);
        this.objArray = {};
        this.InitObjects();
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(origTable,origKey){
        return new ObjectOverride(origTable,origKey);
    }

    /** Initiate all objects from hash table */
    InitObjects(){
        this.objArray = {};
        var pass = this;
        this.forEach(function(val,key){
            var obj = pass.InitSingleObject(pass.orig,key);
            pass.objArray[key] = obj;
        });
    }
    
    /** cycle for all items in table that gets function as a parameter */
    forEachObj(funct){
        for (const key in this.orig) {
            funct(this.objArray[key],key);
        }
    }

    Update(){
        this.InitObjects();
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
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
<<<<<<< HEAD
        this.origTable = origTable;
        this.origKey = origkey;
        this.orig = null;
        this.Reupload();
    }
    
    Reupload(){
        this.orig = this.origTable[this.origKey];
    }

    Update(){
        console.log("reupload");
        this.Reupload();
=======
        this.orig = orig;
>>>>>>> parent of b9faa6d (1)
    }
}

/** class for overriding access to hash tables */
class HtableOverride extends ObjectOverride{

    /** this way you can get hash table overall count */
    get count(){
        return Object.keys(this.origTable).length;
    }

    /** cycle for all items in table that gets function as a parameter */
    forEach(funct){
        for (const key in this.origTable) {
            funct(this.origTable[key],key);
        }
    }
}

/** object that wraps around native hash table and converts it into updating object array on the fly*/
class ObjTable extends HtableOverride{
    constructor(origTable,origkey){
        super(origTable,origkey);
        this.objArray = {};
        this.InitObjects();
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    /** Initiate all objects from hash table */
    InitObjects(){
        this.objArray = {};
        var pass = this;
        this.forEach(function(val,key){
<<<<<<< HEAD
            var obj = pass.InitSingleObject(pass.origTable,key);
=======
            var obj = pass.InitSingleObject(val);
>>>>>>> parent of b9faa6d (1)
            pass.objArray[key] = obj;
        });
    }
    
    /** cycle for all items in table that gets function as a parameter */
    forEachObj(funct){
        for (const key in this.origTable) {
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
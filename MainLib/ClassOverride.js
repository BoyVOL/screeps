class Updatable{

    constructor(){
        
    }
    
    Update(){
        
    }
}


/** class for overriding functionality of different low level class */
class ObjectOverride extends Updatable{

    constructor(orig){
        super();
        this.orig = orig;
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
            funct(this.orig[key]);
        }
    }
}

/** object that wraps around native hash table and converts it into updating object array on the fly*/
class ObjTable extends HtableOverride{
    constructor(orig){
        super(orig);
        this.objArray = new Array();
        this.InitObjects();
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    /** Initiate all objects from hash table */
    InitObjects(){
        this.objArray = new Array();
        var pass = this;
        this.forEach(function(val){
            pass.objArray.push(pass.InitSingleObject(val));
        });
    }
    
    /** cycle for all items in table that gets function as a parameter */
    forEachObj(funct){
        this.objArray.forEach(funct);
    }

    Update(){
        this.InitObjects();
        var funct = function(obj){
            obj.Update();
        }
        this.forEachObj(funct);
    }
}

module.exports = {
    Updatable,
    HtableOverride,
    ObjectOverride,
    ObjTable,
}
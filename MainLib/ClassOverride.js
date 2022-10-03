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

    LoadOrig(orig){
        if(typeof(orig) != 'undefined'){
            this.orig = orig;
        }
    }

    get hasid(){
        return typeof(this.orig.id) != 'undefined';
    }

    Update(){
        super.Update();
        this.LoadOrig();
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
        this.objArray = {};
    }

    /** this way you can get hash table overall count */
    get objcount(){
        return Object.keys(this.objArray).length;
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    AddObject(orig,key){
        var obj = this.InitSingleObject(orig);
        console.log("Addd");
        this.objArray[key] = obj;
    }

    DeleteObject(key){
        console.log("Delete");
        delete this.objArray[key];
    }

    ObjExists(key){
        return this.objArray[key] != undefined;
    }

    UpdateObjects(){
        console.log(this.count,' ',this.objcount);
        var pass = this;
        this.forEach(function(val,key){
            if(!pass.ObjExists(key)){
                pass.AddObject(val,key);
            }
            console.log(pass.objArray[key].orig.memory);
            pass.objArray[key].LoadOrig(val);
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
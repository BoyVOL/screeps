class Updatable{

    constructor(){
        
    }
    
    Update(){
        
    }

    Unload(){
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

    constructor(orig,table = null){
        super();
        this.orig = orig;
    }

    LoadOrig(orig){
        if(typeof(this.orig.id) != 'undefined'){
            this.orig = Game.getObjectById(this.orig.id);
        }
    }

    get key(){
        if(this.hasid) return this.orig.id;
        else return this.orig.name;
    }

    get hasid(){
        return typeof(this.orig.id) != 'undefined';
    }

    get hasname(){
        return typeof(this.orig.name) != 'undefined';
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

    AddRecord(key,val){
        this.orig[key] = val;
    }

    DeleteRecord(key){
        delete this.orig[key];
    }

    Exists(key){
        return typeof(this.orig[key]) != 'undefined';
    }
}

class ObjTable extends HtableOverride{

    constructor(){
        super({});
    }

    Update(){
        super.Update();
    }

}

/** object that wraps around native hash table and converts it into updating object array on the fly*/
class ObjProxyTable extends HtableOverride{
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
        this.objArray[key] = obj;
        this.objArray[key].isoperational = true;
    }

    DeleteObject(key){
        this.objArray[key].Unload();
        delete this.objArray[key];
    }

    ObjExists(key){
        return typeof(this.objArray[key]) != 'undefined';
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
        for (const key in this.objArray) {
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
    ObjProxyTable,
}
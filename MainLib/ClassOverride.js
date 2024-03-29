class Updatable{

    constructor(){
        
    }

    LoadOrig(){
        
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

    constructor(orig){
        super();
        this.gettable = true;
        this.orig = orig;
        this.table = null;
        this.tableid = null;
    }

    LoadOrig(orig){
        if(this.gettable && typeof(this.orig.id) != 'undefined'){
            this.orig = Game.getObjectById(this.orig.id);
        }
    }

    get key(){
        if(this.hastableid) return this.tableid;
        else if(this.hasid) return this.orig.id;
        else return this.orig.name;
    }

    get hasid(){
        return typeof(this.orig.id) != 'undefined';
    }

    get hastableid(){
        return typeof(this.tableid) != 'undefined' && this.tableid != null;
    }

    get hasname(){
        return typeof(this.orig.name) != 'undefined';
    }

    get haskey(){
        return typeof(this.key) != 'undefined';
    }

    Update(){
        super.Update();
        //console.log(this.key,this.orig);
    }

    Unload(){
        super.Unload();
        plainTable.DeleteObject(this);
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

    AsArray(){
        return Object.keys(this.orig).map((key) => [key, this.orig[key]]);
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

    ObjAsArray(){
        return Object.keys(this.objArray).map((key) => [key, this.objArray[key]]);
    }

    /** Method for initiatins single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    AddObject(orig,key){
        var obj = this.InitSingleObject(orig);
        obj.table = this;
        obj.tableid = key;
        plainTable.AddObject(obj);
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
        this.LoadOrig();
        var pass = this;
        this.forEach(function(val,key){
            if(!pass.ObjExists(key)){
                pass.AddObject(val,key);
            }
        });
        this.forEachObj(function(val,key){
            val.LoadOrig();
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

        var funct = function(obj,key){
            obj.Update();
        }
        this.forEachObj(funct);
    }
}

class PlainTable{
    constructor(){
        this.objects = {};
    }

    get count(){
        return Object.keys(this.objects).length;
    }

    AddObject(obj){
        if(obj.haskey) this.objects[obj.key] = obj;
    }

    DeleteObject(obj){
        if(obj.haskey) delete this.objects[obj.key];
    }
}

const plainTable = new PlainTable();

module.exports = {
    Updatable,
    WithParent,
    HtableOverride,
    ObjectOverride,
    ObjProxyTable,
    plainTable
}
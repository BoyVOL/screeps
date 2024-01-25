import { HtableOverride } from "./HtableOverride";

/** object that wraps around native hash table of objects and converts it into updating object array on the fly*/
class ObjProxyTable extends HtableOverride{
    constructor(orig){
        super(orig);
        this.objArray = {};
    }

    /** this way you can get hash table overall count */
    get objcount(){
        return Object.keys(this.objArray).length;
    }
    
    /**
     * Return array of contained objects
     * @returns object array
     */
    ObjAsArray(){
        return Object.keys(this.objArray).map((key) => [key, this.objArray[key]]);
    }

    /** Method for initiating single object that needs to be overread */
    InitSingleObject(orig){
        return new ObjectOverride(orig);
    }

    /**
     * 
     * @param {bla} orig 
     * @param {*} key 
     */
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

    /**
     * Обновляет все объесты. Вызывать раз в цикл
     */
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

export {ObjProxyTable};
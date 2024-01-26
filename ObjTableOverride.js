const {ObjectOverride} = require('./ObjectOverride');
const {plainTable} = require('./PlainClassTable');


/** класс перегружает хеш-таблицы в памяти игры */
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

    /**
     * Возвращает данные как массив
     * @returns 
     */
    AsArray(){
        return Object.keys(this.orig).map((key) => [key, this.orig[key]]);
    }

    AddRecord(key,val){
        this.orig[key] = val;
    }

    DeleteRecord(key){
        delete this.orig[key];
    }

    /**
     * проверка на существование элемента в глобальной памяти
     * @param {*} key идентификатор объекта
     * @returns есть ли элемент
     */
    Exists(key){
        return typeof(this.orig[key]) != 'undefined';
    }
}

/** object that wraps around native hash table of objects and converts it into updating object array on the fly*/
class ObjProxyTable extends HtableOverride{
    constructor(orig){
        super(orig);
        this.objects = {};
    }

    /** this way you can get hash table overall count */
    get objcount(){
        return Object.keys(this.objects).length;
    }

    /**
     * Return array of contained objects
     * @returns object array
     */
    ObjAsArray(){
        return Object.keys(this.objects).map((key) => [key, this.objects[key]]);
    }

    /** Method for initiating single object that needs to be overread
     * override this metod for every new object to get a specific one
     * @param orig memory allocated for this object in original Hash table, passed for initiation in cycle
     * @returns instance of a class
     */
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
        this.objects[key] = obj;
        this.objects[key].isoperational = true;
    }

    DeleteObject(key){
        this.objects[key].Unload();
        delete this.objects[key];
    }

    ObjExists(key){
        return typeof(this.objects[key]) != 'undefined';
    }

    /**
     * Обновляет список объектов. Вызывать до запуска программы
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
        for (const key in this.objects) {
            funct(this.objects[key],key);
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
    HtableOverride,
    ObjProxyTable,
}
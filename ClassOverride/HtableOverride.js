import {ObjectOverride} from "./ObjectOverride";

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
     * проверка на существование элемента в таблице
     * @param {*} key идентификатор объекта
     * @returns есть ли элемент
     */
    Exists(key){
        return typeof(this.orig[key]) != 'undefined';
    }
}

export {HtableOverride};
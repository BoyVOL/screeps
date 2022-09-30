/** class for overriding long term memory usage */
class MemoryItem {

    constructor(key,def){
        this.key = key;
        this.Alloc(def);
    }

    Alloc(value){
        if(typeof(Memory[this.key]) == 'undefined'){
            Memory[this.key] = value;
        }
    }

    get native(){
        return Memory[this.key];
    }

    set native(value){
        Memory[this.key] = value;
    }
}


class HtableOverride{

    constructor(htable){
        this.Htable = htable;
    }

    get length(){
        return Object.keys(this.Htable).length;
    }

    forEach(funct){
        for (const key in this.Htable) {
            funct(this.Htable[key]);
        }
    }
}

class ObjectOverride{

    constructor(object){
        Object.assign(this,object);

        ListKeys(){
            for (const key in this) {
                console.log(key);
            }
        }
    }
}

module.exports = {
    MemoryItem,
    HtableOverride,
    ObjectOverride,
}
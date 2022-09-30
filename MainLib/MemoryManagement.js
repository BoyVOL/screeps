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

    get value(){
        return Memory[this.key];
    }

    set value(value){
        Memory[this.key] = value;
    }
}

class ObjectOverride{

    constructor(orig){
        this.orig = orig;
    }

}


class HtableOverride extends ObjectOverride{

    get count(){
        return Object.keys(this.orig).length;
    }

    forEach(funct){
        for (const key in this.orig) {
            funct(this.orig[key]);
        }
    }
}

module.exports = {
    MemoryItem,
    HtableOverride,
    ObjectOverride,
}
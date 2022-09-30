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

class ObjectOverride{

    constructor(native){
        this.native = native;
    }

}


class HtableOverride extends ObjectOverride{

    get length(){
        return Object.keys(this.native).length;
    }

    forEach(funct){
        for (const key in this.native) {
            funct(this.native[key]);
        }
    }
}

module.exports = {
    MemoryItem,
    HtableOverride,
    ObjectOverride,
}
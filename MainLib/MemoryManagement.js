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
        this.Native = native;
    }

}


class HtableOverride extends ObjectOverride{

    get length(){
        return Object.keys(this.Native).length;
    }

    forEach(funct){
        for (const key in this.Native) {
            funct(this.Native[key]);
        }
    }
}

module.exports = {
    MemoryItem,
    HtableOverride,
    ObjectOverride,
}
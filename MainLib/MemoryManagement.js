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
        this = htable;
    }

    get length(){
        return Object.keys(this).length;
    }

    forEach(funct){
        for (const key in this) {
            funct(this[key]);
        }
    }
}

module.exports = {
    MemoryItem,
    HtableOverride
}
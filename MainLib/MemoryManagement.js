/** class for overriding long term memory usage */
class MemoryItem {

    constructor(key,def="",memPath=Memory){
        this.key = key;
        this.memPath = memPath;
        this.Alloc(def);
    }
    
    /** First memory Allocation */
    Alloc(value){
        if(typeof(this.value) == 'undefined'){
            this.value = value;
        }
    }

    /** property for accessisn value of this field in long term memory */
    get value(){
        return Memory[this.key];
    }

    set value(value){
        Memory[this.key] = value;
    }
}

module.exports = {
    MemoryItem,
}
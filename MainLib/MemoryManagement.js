/** class for overriding long term memory usage */
class MemoryItem {

    constructor(key,def=""){
        this.key = key;
        this.Alloc(def);
    }
    
    /** First memory Allocation */
    Alloc(value){
        if(typeof(Memory[this.key]) == 'undefined'){
            Memory[this.key] = value;
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
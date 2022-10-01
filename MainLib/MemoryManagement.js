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
        return this.memPath[this.key];
    }

    set value(value){
        this.memPath[this.key] = value;
    }
}

module.exports = {
    MemoryItem,
}
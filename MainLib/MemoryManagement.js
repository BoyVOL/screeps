/** class for overriding long term memory usage */
class MemoryItem {

    constructor(key,def="",memPath=Memory){
        this.key = key;
        this.memPath = memPath;
        this.Alloc(def);
    }
    
    /** First memory Allocation */
    Alloc(value){
        if(!this.isset){
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

    get isset(){
        return typeof(this.value) != 'undefined';
    }

    Load(){
        this.memPath = memPath;
    }
}

export {MemoryItem}
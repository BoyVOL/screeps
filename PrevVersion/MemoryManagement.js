/** class for overriding long term memory usage */
class MemoryItem {

    /**
     * base constructor
     * @param {*} key memory hashtable key
     * @param {*} def default value
     * @param {*} memPath path to a memory storage
     */
    constructor(key,def="",memPath=Memory){
        /** memory hashtable key */
        this.key = key;
        /** path to a memory entrance */
        this.memPath = memPath;
        this.Alloc(def);
    }
    
    /**
     * set value if there's none
     * @param {*} value allocated value
     */
    Alloc(value){
        if(!this.isset){
            this.value = value;
        }
    }

    /** get value directly from memory */
    get value(){
        return this.memPath[this.key];
    }

    /** set value directly to memory */
    set value(value){
        this.memPath[this.key] = value;
    }

    /** check if memory is set */
    get isset(){
        return typeof(this.value) != 'undefined';
    }

    /** update object from memory */
    Load(){
        this.memPath = memPath;
    }
}

module.exports = {
    MemoryItem,
}
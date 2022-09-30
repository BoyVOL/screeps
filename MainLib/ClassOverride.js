/** class for overriding functionality of different low level class */
class ObjectOverride{

    constructor(orig){
        this.orig = orig;
    }

}

/** class for overriding access to hash tables */
class HtableOverride extends ObjectOverride{

    /** this way you can get hash table overall count */
    get count(){
        return Object.keys(this.orig).length;
    }

    /** cycle for all items in table that gets function as a parameter */
    forEach(funct){
        for (const key in this.orig) {
            funct(this.orig[key]);
        }
    }
}

module.exports = {
    HtableOverride,
    ObjectOverride,
}
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
    HtableOverride,
    ObjectOverride,
}
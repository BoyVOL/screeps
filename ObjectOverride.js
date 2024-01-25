class Updatable{

    constructor(){
        
    }

    LoadOrig(){
        
    }
    
    Update(){
        
    }

    Unload(){
    }
}

class WithParent extends Updatable{
    constructor(parent){
        super();
        this.parent = parent;
    }
}


/** class for overriding functionality of different low level class */
class ObjectOverride extends Updatable{

    /**
     * 
     * @param {*} orig long term memory instance of this object
     */
    constructor(orig){
        super();
        this.gettable = true;
        this.orig = orig;
        this.table = null;
        this.tableid = null;
    }

    /**
     * Method for loading each cycle data from memory
     */
    LoadOrig(){
        if(this.gettable && typeof(this.orig.id) != 'undefined'){
            this.orig = Game.getObjectById(this.orig.id);
        }
    }

    get key(){
        if(this.hastableid) return this.tableid;
        else if(this.hasid) return this.orig.id;
        else return this.orig.name;
    }

    get hasid(){
        return typeof(this.orig.id) != 'undefined';
    }

    get hastableid(){
        return typeof(this.tableid) != 'undefined' && this.tableid != null;
    }

    get hasname(){
        return typeof(this.orig.name) != 'undefined';
    }

    get haskey(){
        return typeof(this.key) != 'undefined';
    }

    Update(){
        super.Update();
    }

    Unload(){
        super.Unload();
        plainTable.DeleteObject(this);
    }
}

module.exports = {
    Updatable,
    WithParent,
    ObjectOverride
}
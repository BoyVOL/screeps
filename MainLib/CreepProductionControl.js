const { WithParent } = require('./ClassOverride');

class Buildorder extends WithParent{
    
    constructor(parent){
        super(parent);
        this.NextBody = [WORK, CARRY, MOVE];
        this.NextName = GetName();
    }

    GetName(){
        return this.parent.orig.name+Gametime;
    }

    Update(){
        super.Update();
        this.NextName = GetName();
    }
}

module.exports = {
   Buildorder,
}
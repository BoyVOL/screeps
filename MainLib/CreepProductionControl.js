const { WithParent } = require('./ClassOverride');

class Buildorder extends WithParent{
    
    constructor(parent){
        super(parent);
        this.NextBody = [WORK, CARRY, MOVE];
        this.NextName = this.GetName();
    }

    GetName(){
        return this.parent.orig.name+Gametime;
    }

    Update(){
        super.Update();
        this.NextName = this.GetName();
    }
}

module.exports = {
   Buildorder,
}
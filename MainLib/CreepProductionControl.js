const { Updatable } = require('./ClassOverride');

class Buildorder extends Updatable{
    
    constructor(){
        this.NextBody = [WORK, CARRY, MOVE];
        this.NextName = 'Worker';
    }

}

module.exports = {
   Buildorder,
}
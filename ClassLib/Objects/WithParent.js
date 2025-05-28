const {Updatable} = require('./Updatable');

class WithParent extends Updatable{
    constructor(parent){
        super();
        this.parent = parent;
    }
}

module.exports = {
    WithParent,
}
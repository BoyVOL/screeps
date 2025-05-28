const {Updatable} = require('./Updatable.js');

class WithParent extends Updatable{
    constructor(parent){
        super();
        this.parent = parent;
    }
}

module.exports = {
    WithParent,
}
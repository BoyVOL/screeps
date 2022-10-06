const { WithParent } = require('./ClassOverride');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
    }

    Update(){
        super.Update();
        console.log(this.parent.isoperational);
    }
}

class TaskServer {

    constructor(){

    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}
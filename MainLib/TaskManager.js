const { WithParent,HtableOverride } = require('./ClassOverride');
const { MemoryItem} = require('./MemoryManagement');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent.key,this);
    }

    Update(){
        super.Update();
    }

    Unload(){
        super.Unload();
        taskServer.DeleteRecord(this.parent.key);
    }
}

class TaskServer extends HtableOverride{

    constructor(){
        super({});
        this.tasks = new MemoryItem("tasks",{},Game.Memory);
    }

    Update(){
        super.Update();

        var pass = this;
        var funct = function(obj,key){
            obj.Update();
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    taskServer,
}
const { WithParent,HtableOverride } = require('./ClassOverride');
const { MemoryItem} = require('./MemoryManagement');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent.key,this);
        this.activeTask = new MemoryItem("activeTask",{},this.parent.orig.memory);
        this.providedTasks = new MemoryItem("providedTask",new Array(),this.parent.orig.memory);
    }

    Update(){
        super.Update();
        this.activeTask = new MemoryItem("activeTask",{},this.parent.orig.memory);
        this.providedTasks = new MemoryItem("providedTask",new Array(),this.parent.orig.memory);
        this.providedTasks.value.push({
            type:"test"
        });
    }

    Unload(){
        super.Unload();
        taskServer.DeleteRecord(this.parent.key);
    }
}

class CreepClient extends TaskClient{
    constructor(parent){
        super(parent);
    }

    Update(){
        super.Update();
    }
}

class SpawnClient extends TaskClient{

}

class TaskServer extends HtableOverride{

    constructor(){
        super({});
        this.tasks = new Array();
    }

    Update(){
        super.Update();

        this.tasks = new Array();

        var pass = this;
        var funct = function(obj,key){
            obj.Update();

            pass.tasks.push(obj.providedTasks.value);
        }
        this.forEach(funct);
    }
}

const taskServer = new TaskServer();

module.exports = {
    TaskClient,
    CreepClient,
    SpawnClient,
    taskServer,
}
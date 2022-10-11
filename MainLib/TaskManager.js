const { WithParent,HtableOverride } = require('./ClassOverride');
const { MemoryItem} = require('./MemoryManagement');

class TaskClient extends WithParent {
    constructor(parent){
        super(parent);
        taskServer.AddRecord(this.parent.key,this);
        this.activeTask = new MemoryItem("task",{},this.parent.orig.memory);
    }

    Update(){
        super.Update();
        console.log('Update');
        this.activeTask = new MemoryItem("task",{},this.parent.orig.memory);
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
        this.tasks = new MemoryItem("tasks",new Array());
    }

    AddTask(task){
        this.tasks.value.push(task);
    }

    DeleteTask(id){
        this.tasks.value.splice(id,1);
    }

    Update(){
        super.Update();
        
        this.tasks = new MemoryItem("tasks",new Array());

        console.log("-----");

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
    CreepClient,
    SpawnClient,
    taskServer,
}
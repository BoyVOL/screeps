const { ObjProxyTable,plainTable,ObjectOverride,WithParent } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');
const {createUUID} = require('./UUID');

class TaskTable extends ObjProxyTable{
    constructor(){
        super(new MemoryItem('taskTable',{}).value);
    }

    LoadOrig(){
        this.orig = new MemoryItem('taskTable',{}).value;
    }

    InitSingleObject(orig){
        switch (orig.type) {
            case 'mov':
                    return new MovTask(orig);
                break;
        
            default:
                    return new Task(orig)
                break;
        }
    }
}

class Task extends ObjectOverride{
    constructor(orig){
        super(orig);
    }

    LoadOrig(){
        this.orig = taskTable.orig[this.tableid];
    }

    get parent(){
        return plainTable.objects[this.orig.parentid];
    }

    get hasParent(){
        return typeof(this.parent) != 'undefined';
    }

    get executer(){
        return plainTable.objects[this.orig.executerid];
    }

    get hasExecuter(){
        return typeof(this.executer) != 'undefined';
    }

    Update(){
        super.Update();
    }
}

class MovTask extends Task{
    Update(){
        super.Update();
        console.log("movtask!");
    }
}

class TaskHandler extends WithParent{
    PostTask(data){
        data.parentid = this.parent.key;
        taskTable.AddRecord(createUUID(),data);
    }

    GetTask(id){
        return taskTable.objArray[id];
    }

    TaskExists(id){
        return taskTable.ObjExists(id);
    }
}

class MovTaskHost extends TaskHandler{
    Update(){
        super.Update();
        var task = {type: 'mov', dest: this.parent.GetRandomPos()};
        this.PostTask(task);
    }
}

class TaskExecuter extends TaskHandler{
    constructor(parent){
        super(parent);
        this.activeTask = null;
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
    }

    GetAvailableTasks(){
        var taskArray = taskTable.AsArray();
        return taskArray;
    }

    PickRandomTask(){
        var tasks = this.GetAvailableTasks();
        var id = Math.floor(Math.random()*tasks.length);
        return tasks[id][0];
    }

    Update(){
        super.Update();
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
    }
}

const taskTable = new TaskTable();

module.exports = {
    Task,
    TaskExecuter,
    MovTaskHost,
    taskTable
}
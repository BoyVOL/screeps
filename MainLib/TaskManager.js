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
}

class MovTask extends Task{
    Update(){
        super.Update();
        console.log("movtask!");
    }
}

class TaskHandler extends WithParent{
    PostTask(data){
        taskTable.AddRecord(createUUID(),data);
    }
}

class MovTaskHost extends TaskHandler{
    Update(){
        super.Update();
        var task = {type: 'mov', dest: this.parent.GetRandomPos()};
        this.PostTask(task);
        console.log("update");
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

    DownloadTask(){
        if(this.hasTask) this.activeTask = taskTable.GetTask(this.activeTaskId.value);
    }

    OccupyTask(taskId){
        this.activeTaskId.value = taskId;
        taskTable.orig[taskId].executerid = this.parent.key;
    }

    UnoccupyTask(taskId){
        this.activeTaskId.value = null;
        taskTable.orig[taskId].executerid = null;
    }

    get hasTask(){
        return this.activeTaskId.value != null;
    }

    CompleteTask(taskId){
        this.UnoccupyTask(taskId);
        taskTable.DeleteRecord(taskId);
    }

    Update(){
        super.Update();
        this.activeTaskId = new MemoryItem('activeTaskId',null,this.parent.orig.memory);
        if(!this.hasTask){
            this.OccupyTask(this.PickRandomTask())
        } else {
            this.OccupyTask(this.activeTaskId.value);
        };
        this.DownloadTask();
        if(this.parent.orig.pos.inRangeTo(this.activeTask.dest,0)) this.CompleteTask(this.activeTaskId.value);
    }
}

const taskTable = new TaskTable();

module.exports = {
    Task,
    TaskExecuter,
    MovTaskHost,
    taskTable
}
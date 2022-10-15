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
        return new Task(orig);
    }
}

class Task extends ObjectOverride{
    constructor(orig){
        super(orig);
    }

    LoadOrig(){
        console.log(this.key);
        this.orig = taskTable.orig[this.key];
        console.log("update task");
    }
}

class TaskHandler extends WithParent{

}

class MovTaskHost extends TaskHandler{
    Update(){
        super.Update();
        var task = {type: 'mov', dest: this.parent.GetRandomPos()};
        taskTable.AddRecord(createUUID(),task);
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
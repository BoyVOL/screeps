const { HtableOverride } = require('./ClassOverride');
const { MemoryItem } = require('./MemoryManagement');

class TaskTable extends HtableOverride{
    constructor(){
        super(new MemoryItem('taskTable').value);
        console.log(new MemoryItem('taskTable').value);
    }

    LoadOrig(){
        this.orig = new MemoryItem('taskTable').value;
    }
}

const taskTable = new TaskTable();

module.exports = {
    taskTable
}
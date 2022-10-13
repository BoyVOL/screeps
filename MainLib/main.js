console.log("______________________________________________________________________________");
const { roomTable} = require('./RoomsOverride');
const { spawnTable} = require('./SpawnOverride');
const { creepTable} = require('./CreepOverride');
const { structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { flagTable } = require('./FlagsOverride');
const { plainTable } = require('./ClassOverride');
const { taskTable,Task } = require('./TaskManager');
const {createUUID} = require('./UUID');

function loop(){
    
    roomTable.Update();
    taskTable.Update();
    taskTable.UploadTask(new Task({type: 'test'}));
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
    
    console.log(plainTable.count);
}

module.exports = {
    loop,
}
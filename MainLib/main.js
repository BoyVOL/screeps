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
        
    taskTable.Update();
    roomTable.Update();
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
}

module.exports = {
    loop,
}
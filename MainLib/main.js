console.log("______________________________________________________________________________");
const { roomTable} = require('./RoomsOverride');
const { spawnTable} = require('./SpawnOverride');
const { creepTable} = require('./CreepOverride');
const { structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { flagTable } = require('./FlagsOverride');
const { plainTable } = require('./ClassOverride');
const { taskTable } = require('./TaskManager');
const {createUUID} = require('./UUID');

function loop(){
    
    roomTable.Update();
    taskTable.Update();
    taskTable.AddRecord(Date.now(),{bla : "bla"});
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
    
    console.log(plainTable.count);
}

module.exports = {
    loop,
}
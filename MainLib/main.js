console.log("______________________________________________________________________________");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { flagTable } = require('./FlagsOverride');
const { plainTable } = require('./ClassOverride');
const { taskTable } = require('./TaskManager');

function loop(){
    
    roomTable.Update();
    taskTable.Update();
    taskTable.AddRecord({bla: 'bla'});
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
    console.log(plainTable.count);
}

module.exports = {
    loop,
}
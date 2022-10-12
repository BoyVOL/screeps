console.log("______________________________________________________________________________");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { flagTable } = require('./FlagsOverride');

function loop(){
    
    roomTable.Update();
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
}

module.exports = {
    loop,
}
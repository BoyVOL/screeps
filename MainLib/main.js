console.log("______________________________________________________________________________");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { taskServer } = require('./TaskManager');

function loop(){
    
    roomTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
    taskServer.Update();

}

module.exports = {
    loop,
}
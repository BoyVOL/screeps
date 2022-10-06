console.log("______________________________________________________________________________");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { taskServer } = require('./TaskManager');

function loop(){
    
    taskServer.Update();
    roomTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();

}

module.exports = {
    loop,
}
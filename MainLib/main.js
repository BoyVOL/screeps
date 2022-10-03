const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");

function loop(){

    roomTable.Update();
    spawnTable.Update();
    structTable.Update();
    creepTable.Update();

}

module.exports = {
    loop,
}
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
console.log("______________________________________________________________________________");
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');


function loop(){
    
    roomTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();

}

module.exports = {
    loop,
}
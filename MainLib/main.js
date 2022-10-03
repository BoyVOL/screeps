const { SpawnOverride,SpawnTable,spawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable,creepTable} = require('./CreepOverride');
const { StructureOverride,StructureTable,structTable} = require("./StructureOverride");
const { RoomOverride,RoomsTable,roomTable} = require('./RoomsOverride');
const { MemoryItem } = require('./MemoryManagement');

console.log("______________________________________________________________________________");

function loop(){
    
    conaole.log("Done");
    roomTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();

}

module.exports = {
    loop,
}
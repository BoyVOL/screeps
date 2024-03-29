console.log("______________________________________________________________________________");
const { roomTable} = require('./RoomsOverride');
const { spawnTable} = require('./SpawnOverride');
const { creepTable} = require('./CreepOverride');
const { structTable} = require("./StructureOverride");
const { MemoryItem } = require('./MemoryManagement');
const { flagTable } = require('./FlagsOverride');
const { plainTable } = require('./ClassOverride');
const {createUUID} = require('./UUID');

function loop(){
    console.log("UPDATE >>>>>>>>");
    roomTable.UpdateObjects();
    flagTable.UpdateObjects();
    structTable.UpdateObjects();
    spawnTable.UpdateObjects();
    creepTable.UpdateObjects();

    roomTable.Update();
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
}

module.exports = {
    loop,
}
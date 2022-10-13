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
    taskTable.AddRecord(Date.now(),{bla : "bla"});
    flagTable.Update();
    structTable.Update();
    spawnTable.Update();
    creepTable.Update();
    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    console.log(create_UUID());
    console.log(create_UUID());
    console.log(create_UUID());
    console.log(create_UUID());
    console.log(create_UUID());
    console.log(create_UUID());
    console.log(plainTable.count);
}

module.exports = {
    loop,
}
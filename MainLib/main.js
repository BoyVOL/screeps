const { SpawnOverride,SpawnTable} = require('./SpawnOverride');
const { CreepOverride,CreepTable} = require('./CreepOverride');

console.log("______________________________________________________________________________");

const spawnTable = new SpawnTable();
const creepTable = new CreepTable();

function loop(){
    console.log(spawnTable.objArray.length);
    spawnTable.Update();
    console.log(creepTable.objArray.length);
    creepTable.Update();
}

module.exports = {
    loop,
}
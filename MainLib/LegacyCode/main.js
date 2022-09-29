var SS = require('CustomSpawns');
var CC = require('CustomCreeps');
var MM = require('MemoryManagement');
var CT = require('CustomTowers');

global.SpawnSt = new SS.SpawnStorer("SS2");

global.CreepSt = new CC.CreepStorer("CC2");

global.TowerSt = new CT.TowerStorer("CT");

console.log("______________________________________________________________________________");

module.exports.loop = function () {
    SpawnSt.UpdateObjects();
    CreepSt.UpdateObjects();
    TowerSt.UpdateObjects();
    MM.ClearMemory();
}
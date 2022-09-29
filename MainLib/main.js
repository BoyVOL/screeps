var SS = require('LegacyCode/CustomSpawns');
var CC = require('LegacyCode/CustomCreeps');
var MM = require('LegacyCode/MemoryManagement');
var CT = require('LegacyCode/CustomTowers');

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
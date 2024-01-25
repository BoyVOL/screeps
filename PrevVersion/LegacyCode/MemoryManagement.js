/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('MemoryManagement');
 * mod.thing == 'a thing'; // true
 */

function ClearMemory(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    };
    for(var name in Memory.spawns) {
        if(!Game.spawns[name]) {
            delete Memory.spawns[name];
        }
    }
}

module.exports = {
    ClearMemory,
};
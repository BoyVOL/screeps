/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Constants');
 * mod.thing == 'a thing'; // true
 */

var Actions = {
    'move' : 0,
    'harvest' : 1,
    'carry' : 2,
    'build' : 3,
    'repair' : 4,
    'withdraw' : 5,
    'distantHarvest' : 6,
    'defend' : 7
}

module.exports = {
    Actions,
};
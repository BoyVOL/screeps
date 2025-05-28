/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('MemoryManagement');
 * mod.thing == 'a thing'; // true
 */

function LogRandom(slope,max){
    var result = -1;
    while(result < 0){
        result = max - (Math.floor(Math.log((Math.random() * Math.pow(slope, max+1)) + 1.0) / Math.log(slope)) + 1);
    }
    if(result > max) result = max;
    return result;
}

module.exports = {
    LogRandom,
};
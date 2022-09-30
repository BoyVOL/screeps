const { MemoryItem } = require('./MemoryManagement');
const { ObjectOverride,HtableOverride,ObjTableOverride } = require('./ClassOverride');

console.log("______________________________________________________________________________");


class test extends Creep{
}

function loop(){

    var test = new MemoryItem("test");
    var sptable = new ObjTableOverride(Game.spawns);
    test.value = sptable.orig;
    console.log(sptable.count);
    sptable.InitObjects();
    console.log(sptable.objArray,sptable.objArray.length);
    sptable.forEachObj(function(val){
        console.log(val.orig.id);
    })
}

module.exports = {
    loop,
}
console.log("______________________________________________________________________________");

const {RoomTable} = require('./RoomOverride');

var RTable = new RoomTable;

function loop(){
    RTable.Update();

    console.log(RTable.AsArray());
    console.log(RTable.objects['sim1']);
}
module.exports = {
    loop,
}
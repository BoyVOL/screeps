const {ObjectOverride} = require('./ObjectOverride');
const {ObjProxyTable} = require('./ObjTableOverride');

class OverridedRoom extends ObjectOverride{

}

class RoomTable extends ObjProxyTable{

}

module.exports = {
    OverridedRoom,
    RoomTable,
}
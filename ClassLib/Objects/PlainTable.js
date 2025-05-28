/**
 * Класс "плоской" таблицы объектов, в которой представлены они все
 * Работает с классом ObjectOverride
 */
class PlainTable{
    constructor(){
        this.objects = {};
    }

    /**
     * Возвращает количество элементов в объекте.
     */
    get count(){
        return Object.keys(this.objects).length;
    }

    AddObject(obj){
        if(obj.haskey) this.objects[obj.key] = obj;
    }

    DeleteObject(obj){
        if(obj.haskey) delete this.objects[obj.key];
    }
}

module.exports = {
    PlainTable
}
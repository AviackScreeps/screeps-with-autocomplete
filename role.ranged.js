

var roleRanged = {

    /** @param {Creep} creep **/
    run: function (creep, hostiles) {

        if (hostiles.length == 0) {
            return;
        }

        var target = creep.pos.findClosestByRange(hostiles);
        if (creep.pos.getRangeTo(target) > 3) {
            target = creep.pos.findClosestByPath(hostiles);
            creep.moveTo(target);
        } else {
            creep.rangedAttack(target);
        }
        
    }
};


module.exports = roleRanged;
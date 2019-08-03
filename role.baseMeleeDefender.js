

var roleBaseMeleeDefender = {

    /** @param {Creep} creep **/
    run: function (creep, hostiles) {

        if (creep.pos.roomName != "W12S3") {
            console.log("creep " + creep + "can't defend room thats not W12S3");
            return;
        }

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


module.exports = roleBaseMeleeDefender;
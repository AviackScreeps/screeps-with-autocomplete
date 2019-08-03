

var roleRanged = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //console.log(creep);
        if (creep == undefined) {
            return;
        }

        if (creep.room.name != 'W13S3') {
            if (creep.memory.exitLocation == undefined) {
                var exitCode = creep.room.findExitTo('W13S3');

                var exitPos = creep.pos.findClosestByPath(exitCode);
                creep.memory.exitLocation = { x: exitPos.x, y: exitPos.y };
            }
            creep.moveTo(creep.memory.exitLocation.x, creep.memory.exitLocation.y);
        } else {
            var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);

            var target = undefined;

            if (targets.length > 0) {
                target = _.first(targets);
            }

            if (target == undefined) {
                target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                //console.log(target);
            }

            if (target == undefined) {
                target = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
            }

            if (target != undefined) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }

    }
};


module.exports = roleRanged;
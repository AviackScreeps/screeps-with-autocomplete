var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.working = false;
                if (creep.memory.target != undefined) {
                    delete creep.memory.undefined;
                }
                return;

            }
            creep.memory.working = true;

            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (object) {
                    return ((object.hits / object.hitsMax) < 0.95 && object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_RAMPART);
                }
            });
            if (target != undefined) {
                //console.log(creep + " is repairing");
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }

            } else {

                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (target != undefined) {
                    //console.log(creep + " is building");
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    //console.log(creep + " is walling");

                    target = Game.getObjectById(creep.memory.target);
                    if (target == undefined) {
                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (s) => s.structureType == STRUCTURE_RAMPART
                        });

                        var minhp = 1000000;
                        for (let structure of targets) {
                            if (structure.hits < minhp) {
                                minhp = structure.hits;
                                target = structure;
                            }
                        }
                    }

             
                    repairResult = creep.repair(target);
                    if (target == undefined) {
                        //console.log('no rampart to repair');
                    } else {
                        //console.log("repairing " + target.structureType + " " + target + " " + repairResult);
                        creep.memory.target = target.id;
                        if (repairResult == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                    

                }

            }

        }
    }
};


module.exports = roleBuilder;
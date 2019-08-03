var roleWaller = {

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
            var targetContainer = undefined;
            if (creep.memory.targetContainerId == undefined) {

                var targetContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { ignoreCreeps: true, filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1000 })

                if (targetContainer != undefined) {
                    creep.memory.targetContainerId = targetContainer.id;
                }
            }
            else {
                targetContainer = Game.getObjectById(creep.memory.targetContainerId);
            }
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

            if (targetContainer != undefined) {
                var result = creep.withdraw(targetContainer, RESOURCE_ENERGY);
                //console.log(result);
                if (result == ERR_NOT_IN_RANGE) {

                    if (creep.memory.pathToContainer == undefined) {
                        creep.memory.pathToContainer = creep.pos.findPathTo(targetContainer.pos, { ignoreCreeps: true })
                    }
                    creep.moveByPath(creep.memory.pathToContainer);
                }
                else {
                    creep.memory.targetContainerId = undefined;
                    creep.memory.pathToContainer = undefined;
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.working = false;
                delete creep.memory.target;
                return;

            }
            creep.memory.working = true;

            var targetStructure = undefined;
            if (creep.memory.target != undefined) {
                targetStructure = Game.getObjectById(creep.memory.target);
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: function (object) {
                        return ((object.hits < object.hitsMax) && (object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART));
                    }
                });
                //console.log(targets)
                var minHits = 2;
                for (let s of targets) {
                    pathfinding = PathFinder.search(creep.pos, s.pos);
                    if(pathfinding == undefined || pathfinding.incomplete == true) {
                        continue;
                    }
                 
                    //console.log(s.hits / s.hitsMax);
                    if ((s.hits / s.hitsMax) < minHits) {
                        minHits = s.hits / s.hitsMax;
                        targetStructure = s;
                    }
                    if (s.hits < 10000) {
                        minHits = -1;
                        targetStructure = s;
                        break;
                    }
                }
                //targetStructure = _.minBy(targets, (s) => (s.hits / s.hitsMax));
            }

            
            if (targetStructure != undefined) {
                //console.log(creep + " is repairing");
                if (creep.repair(targetStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                }
                creep.memory.target = targetStructure.id;

            } else { console.log('no walls found wut')}

        }
    }
};


module.exports = roleWaller;
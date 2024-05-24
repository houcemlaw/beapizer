
const genericPersistenceHandler = require('../persistence/generic-persistence-handler')

const getOneToManyEntitiesByCriteria = (parent, membersToPopulate, req, res, next) => {
  return genericPersistenceHandler.getOneToManyEntitiesByCriteria(parent, membersToPopulate, req, res, next);
}

const getEntitiesByCriteria = (entity, req, res, next) => {
  return genericPersistenceHandler.getEntitiesByCriteria(entity, req, res, next);
}

// Get entity by ID
const getEntityById = (entity, req, res, next) => {
  return genericPersistenceHandler.getEntityById(entity, req, res, next);
}


//CREATE an entity : Generic entity creation
const createEntity = (entity, req, res, next) => {
  return genericPersistenceHandler.createEntity (entity, req, res, next);
}

// DELETE an entity : Generic entity deletion
const deleteEntityById = (entity, req, res, next)=>{
  return genericPersistenceHandler.deleteEntityById(entity, req, res, next);
}

const deleteEntityRelationCollection = (entity, req, res, next)=>{
  return genericPersistenceHandler.deleteEntityRelationCollection(entity, req, res, next);
} 

// UPDATE: Generic entity updator
const updateEntityById =  (entity, req, res, next) => { 
  return genericPersistenceHandler.updateEntityById(entity, req, res, next);
}


module.exports = {
  getOneToManyEntitiesByCriteria,
  getEntitiesByCriteria,
  getEntityById, 
  createEntity,
  updateEntityById,
  deleteEntityById,
  deleteEntityRelationCollection
}
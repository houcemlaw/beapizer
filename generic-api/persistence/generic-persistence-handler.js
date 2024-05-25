
const mongodbPersistenceHandler = require('./mongodb/mongodb-persistence-handler')
const ds_dialect = require('./db').DS_DIALECT;

const getOneToManyEntitiesByCriteria = (parent, membersToPopulate, req, res, next) => {
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.getOneToManyEntitiesByCriteria(parent, membersToPopulate, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
        //Default to 'mongodb'
        return mongodbPersistenceHandler.getOneToManyEntitiesByCriteria(parent, membersToPopulate, req, res, next);
  }
  
}

const getEntitiesByCriteria = (entity, req, res, next) => {
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.getEntitiesByCriteria(entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
        //Default to 'mongodb'
        return mongodbPersistenceHandler.getEntitiesByCriteria(entity, req, res, next);
  }
  
}

// Get entity by ID
const getEntityById = (entity, req, res, next) => {
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.getEntityById(entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
        //Default to 'mongodb'
        return mongodbPersistenceHandler.getEntityById(entity, req, res, next);
  }  
}


//CREATE an entity : Generic entity creation
const createEntity = (entity, req, res, next) => {
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.createEntity (entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
      //Default to 'mongodb'
      return mongodbPersistenceHandler.createEntity (entity, req, res, next);
  }
}

// DELETE an entity : Generic entity deletion
const deleteEntityById = (entity, req, res, next)=>{
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.deleteEntityById(entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
      //Default to 'mongodb'
      return mongodbPersistenceHandler.deleteEntityById(entity, req, res, next);
  }
}

const deleteEntityRelationCollection = (entity, req, res, next)=>{
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.deleteEntityRelationCollection(entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
      //Default to 'mongodb'
      return mongodbPersistenceHandler.deleteEntityRelationCollection(entity, req, res, next);
  }
} 

// UPDATE: Generic entity updator
const updateEntityById =  (entity, req, res, next) => { 
  switch(ds_dialect) {
    case 'mongodb':
      return mongodbPersistenceHandler.updateEntityById(entity, req, res, next);
    case 'mysql':
      /// TO-DO: implement MySQL db dialect
      break;
    default:
      //Default to 'mongodb'
      return mongodbPersistenceHandler.updateEntityById(entity, req, res, next);
  }
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
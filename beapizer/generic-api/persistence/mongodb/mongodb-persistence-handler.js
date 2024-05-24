const Mongoose = require('mongoose')

// Default max allowed instances per page
const MAX_ALLOWED_PAGE_SIZE = !process.env.MAX_PAGE_SIZE ? 100 : process.env.MAX_PAGE_SIZE;


console.info(`Using DB max page size: ======> ${MAX_ALLOWED_PAGE_SIZE}`);




const getOneToManyEntitiesByCriteria = (parent, membersToPopulate, req, res, next) => {
  const filter = req.params.criteria
  let filters = {}
  let query = null
  let queryCount= null
  
  if (filter){
      try {
        filters = JSON.parse(filter)
      } catch (error) {
        return res.status(470).json([])
      }
      query = parent.find(filters)
      queryCount = parent.countDocuments(filters)          
  } else {
    query = parent.find()
    queryCount = parent.countDocuments()
  } 
    query.populate(membersToPopulate)
         .exec()
         .then(returnedEntities => {
              if (returnedEntities) {
                queryCount
                .exec()
                .then(count => {
                              // No paging requested , no parameters ==> only return 50 elements to prevent 
                              // huge load and show a notification message field in case the collection size excceeded 50 elements
                                      return res.status(200).json(returnedEntities)
                })
              }
              else {
                  return res.status(200).json([])
                }
            })
    .catch(err=> {
      console.error(err);
      return res.status(470).send({code: err, message: err})
      })
}

const getEntitiesByCriteria = (entity, req, res, next) => {

  const { filter, compositekeys, page, pagesize, sort, fields } = req.query
  let filters = {}
  let query = null
  let queryCount= null
  let pageSize_ = pagesize
  let page_ = !page ? 1 : page;

  if (!pageSize_ || pageSize_ > MAX_ALLOWED_PAGE_SIZE){
    pageSize_=MAX_ALLOWED_PAGE_SIZE
  } 

  if (filter){
      try {
        filters = JSON.parse(filter);
        // if (!isAdmin){
        //   filters['createdBy']={$eq: req.userId}
        // }
      } catch (error) {
        return res.status(470).json([])
      }
      query = entity.find(filters)
      queryCount = entity.countDocuments(filters)          
  } 
  else {
    query = entity.find()
    queryCount = entity.countDocuments()
  } 
 
  if (sort){
    query.sort(sort)
  }
  // if (page){  
    // skip to requested page and limit the query result to pageSize 
    query.skip((pageSize_ * page) - pageSize_)
      .limit(parseInt(pageSize_))
  // }
  if (fields){
    query.select(fields)
  }
  if (compositekeys){
    query.populate(compositekeys)
  }
    query.exec()
          .then(returnedEntities => {
              if (returnedEntities) {
                queryCount
                .exec()
                .then(count => {
                              // if (count <= MAX_ALLOWED_PAGE_SIZE){
                                  // No paging requested , no parameters ==> only return [page size] elements to prevent 
                                  // huge load and show a notification message field in case the collection size excceeded [max page size] elements
                                  // if (!page){
                                  //   return res.status(200).json(returnedEntities)
                                  // } else {
                                          
                                          // I can place the needed information in the http header for example or send it in a json response as below
                                          res.setHeader('total-pages', Math.ceil(count / pageSize_))
                                          res.setHeader('current-page', page_)
                                          res.setHeader('page-size', pageSize_)
                                          res.status(200).json(returnedEntities)
                                          return;
                                        // }
                              // } 
                              // else {
                              //   return res.status(470).json({code: 1, message: 'Number of entities exceeded the allowed number to show : please use pagination instead'})
                              // }
               })
              }
              else {
                  return res.status(200).json([])
                }
            })
    .catch(err=> {
      console.error(err);
      return res.status(470).send({code: err, message: err})
      })
}

// Get entity by ID
const getEntityById = (entity, req, res, next) => {
  const { filter, compositekeys, page, pageSize, sort, fields } = req.query
  let objectid = req.params.id
  let query = null;

  query=entity.findById(objectid)
  if (!objectid || objectid == null){
    return res.status(470).send({code: 2, message: 'wrong query'});
  }
  if (fields){
    query.select(fields)
  }
  if (compositekeys){
    query.populate(compositekeys)
  }
  
  query.exec()
        .then(returnedEntity=>{
          if (!returnedEntity){
            return res.status(470).json({code: 2, message: 'No entity found for the given criteria id='+objectid});
          } else {
            return res.status(200).json(returnedEntity)
          }
        })
        .catch(err=> {
          console.error(err);
          return res.status(470).send({code: err, message: err})
        })
}


// CREATE an entity : Generic entity creation
const createEntity = (entity, req, res, next) => {
  let entityData = req.body;
  if (!entityData){ 
    res.status(470).send({code: 2, message: 'wrong query'});
    return; 
  }


  // Bulk creation 
  if (entityData instanceof Array){
  //TODO: add handler for empty json collection => [{},{}]
    if (entityData.length===0 || 
        //collection not empty but elements are empty (handle the case entityData = [{},...])
        (entityData.length>0 && !Object.keys(entityData[0]).length)
        ){
      return res.status(200).json({
                                    insertedEntitiesCount: 0 
                                  })
      }

    // ordered: true  ==> rollback all on error
    // ordered: false ==> do not skip on error / partial insert on error
    const options = {ordered: true} 

      entity.insertMany(entityData, options)
            .then(docs => {
              console.log('Entities saved !')
              return res.status(200).json({
                                            insertedEntitiesCount: !!docs ? docs.length : 0 
                                          })
               
            })
            .catch(err => {
              return res.status(470).send({code: err, message: err})
              })
        
  } else {
          if (!Object.keys(entityData).length){ // handles the case entityData={}
          return res.status(200).json({
                                        insertedEntitiesCount: 0 
                                      })
          }
        // let newEntity = new entity(entityData);
        let newEntity = new entity();
        Object.assign(newEntity,entityData);
        // Check if entity already exists then save it if not
        entity.findOne({_id: newEntity._id})
        .exec()
        .then(doc => {
          if (!doc){
            newEntity.save()
                    .then(doc => {
                      if (!doc){
                        console.log('Unable to save entity')
                        return res.status(470).send({code: 4, message: 'Unable to save entity'})
                      } else {
                          console.log('Entity saved !')
                          return res.status(200).send(doc)
                      }
                    })
                    .catch(err => {
                      return res.status(470).send({code: err, message: err})
                      });
          
          } else {
            return res.status(470).send({code: 5, message: "entity already exists"}) 
          }
        })
        .catch(err => {
          return res.status(470).send({code: err, message: err})
          })
      }   
}

// DELETE an entity : Generic entity deletion
const deleteEntityById = (entity, req, res, next)=>{
  const id = req.params.id
  if (!id ){
    res.status(470).send({code: 2, message: 'wrong query'});
    return;
}
  entity.findByIdAndDelete(id) 
        .exec()
        .then(returnedEntity=>{
          if (returnedEntity===null){
            return res.status(200).json({code: 12, message: 'entity already deleted!!'});
          }
          return res.status(200).json(returnedEntity);
        })
        .catch(err=> {
          console.error(err);
          return res.status(470).send(err)
        })
}

const deleteEntityRelationCollection = (entity, req, res, next)=>{
  return updateEntityById(entity, req, res, next);
} 

// UPDATE an entity: Generic entity updator
const updateEntityById =  (entity, req, res, next) => { 
  const id = req.params.id
  const relationName = req.params.relationName
  const cids = req.query
  const options = {new: true}
  const requestBody = req.body;
  // let isAdmin = req.isadmin;
  // let userID = req.userId;
  let performTheUpdate = true;
 
  var update = {};
  var simpleFields={};
  var collectionFields={};

  if (!id ){
    throw ({
      status: 470,
      message: 'wrong query'
    })
    }
    
  for(var key in requestBody) {
    if (requestBody[key] instanceof Array){
      collectionFields[key]=requestBody[key]
    } else {
      simpleFields[key]=requestBody[key]
    }
}
    if (Object.keys(simpleFields).length>0){
      update['$set']=simpleFields
    }
    if (Object.keys(collectionFields).length>0){
      update['$addToSet']=collectionFields
    }
    ////{ $pull: { roles: { $in: [ "_id1", "_id2" ] }} },
    //// { multi: true }
    if (relationName && cids){
        const idsArray = JSON.parse(cids.cids);
        if (idsArray.length > 0){
          options['multi'] = true
        }

        // var arr = [];
        // for(var id_key in idsArray) {
        //   arr.push(idsArray[id_key]._id);
        // }
        const ids = {}
        const ids_in = {};
        ids_in['$in'] = idsArray;
        ids[relationName] = ids_in;
        update['$pull']=ids
    }


if (Object.keys(update).length===0){
  return res.status(200).send('nothing to update!');
}
entity.findOne({_id: id}) 
            .exec()
            .then(doc=>{
                if (doc){
                  if (!performTheUpdate){
                    // if (doc.createdBy && doc.createdBy.toString()===userID ){
                    //   performTheUpdate = true;
                    // } else {
                      return res.status(470).json({code: 7, message: 'You are not authorized to update the entity(ies) !'});
                    // }
                  }
                  if (performTheUpdate){
                    entity.findByIdAndUpdate(id, update, options) 
                    .exec()
                    .then(returnedEntity=>{
                      if (!returnedEntity){
                        return res.status(470).json({
                                                      updatedcount:0,
                                                      message: 'no entity found with the given criteria'
                                                    })
                      }
                      return res.status(200).json(returnedEntity)
                    })
                    .catch(err=> {
                      console.error(err);
                      // return res.status(470).send(err);
                      next({
                        error: err,
                        status: 470,
                        message: 'wrong query'
                      });
                      return;
                    })
                  }
                } else {
                  return res.status(470).send({code: 10, message: 'entity does not exist'}) 
                }
            }
            )
            .catch(err=> {
              console.error(err);
              next({
                error: err,
                status: 470,
                message: 'wrong query'
              });
              return;
            });
      
      
      
      
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
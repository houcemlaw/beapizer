


updateChildren_handler = (childEntity, idObjects, relationName, updates) => { 
//     const filter = { _id: {"$in": idObjects} }
//     // const updates = { $addToSet: { "users": [this._id ]} }
//     const options = {new: true}
//     const update = (idObjects instanceof Array) ? 
//                     {$addToSet: {relationName: [updates]}} : 
//                     {$set: {relationName: updates}} ;
    
//     if (!updates || !relationName){
//       throw new Error('no data to update');
//   }

//     if (idObjects instanceof Array) {
//         // const filter = {"users": id}
//         childEntity.updateMany(filter, update).exec();

//     } else {  
//     childEntity.findByIdAndUpdate(idObjects, update, options) 
//         .exec()
//         .then(returnedEntity=>{
//             if (!returnedEntity){
//                 throw new Error({
//                                             updatedcount:0,
//                                             message: 'no entity found with the given criteria'
//                                         });
//             }
//             return returnedEntity;
//         })
//         .catch(err=> {
//             console.log(err);
//             throw new Error(err);
//         })
//     }

  }

  module.exports = {
      /**
       * childEntity: the child entity type to be updated
       * idObjects: the objectID(s) related to the child(ren) to be updated (either a composite entity or a collection )
       * relationName: the relation name 
       * updates: the value(s) to be updated in the child entity
       */

    updateChildren: (childEntity, idObjects,relationName, updates) => {
      return updateChildren_handler(childEntity, idObjects, relationName, updates);
    }
  }
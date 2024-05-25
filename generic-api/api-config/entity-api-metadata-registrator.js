
class EntityAPIMetaDataRegistrator {

    // entityApiMetaData = [
    //                             {
    //                                 entity: the entity,
    //                                 resourcePath: the api resource path
    //                             }
    //                        ]
     entityApiMetaData = [];

    constructor(){
       this.entityApiMetaData = [] ;
    }

    register(entity, resourcePath){
        this.entityApiMetaData.push({
                                    entity: entity,
                                    resourcePath: resourcePath
                                })
    }
};

const EntityAPIMDataRegistrator = new EntityAPIMetaDataRegistrator();

module.exports = EntityAPIMDataRegistrator

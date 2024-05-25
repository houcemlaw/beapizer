  


const beapizerGenericAPI = (entity, resourcePath, router) => {
      
      const actionHandler = require('../api-action/action-handler')
      const actionInterceptor = require('../api-action/action-interceptor');
      
      // ############################################################
      // #                                                          #
      // #                Beapizer Generic Backend API                #
      // #                                                          #
      // ############################################################
      
      router.get(`/${resourcePath}`, actionInterceptor.intercepCall(), async (req, res, next) => {
        await actionHandler.getEntitiesByCriteria(entity, req, res, next);
      })
      
        router.get(`/${resourcePath}/:id`, actionInterceptor.intercepCall(), async (req, res, next) => {
          await actionHandler.getEntityById(entity, req, res, next)
        })
      
        router.post(`/${resourcePath}`, actionInterceptor.intercepCall(), async (req, res, next) => {
          await actionHandler.createEntity(entity, req, res, next)
        }
        )
      
      router.patch(`/${resourcePath}/:id`, actionInterceptor.intercepCall(), async (req, res, next) => {      
        await actionHandler.updateEntityById(entity, req, res, next);
      });
      
      router.delete(`/${resourcePath}/:id`, actionInterceptor.intercepCall(), async (req, res, next) => {
        await actionHandler.deleteEntityById(entity, req, res, next);
      });

    return router;
}

module.exports = beapizerGenericAPI
const express = require('express');
let router = express.Router();
const genericApi = require('./beapizer-generic-api');
const entityAPIMetadatRegistrator = require('../api-config/entity-api-metadata-registrator');

router = entityAPIMetadatRegistrator.entityApiMetaData.reduce((p,c)=> {
    return genericApi(c.entity, c.resourcePath, p);
}, router);

router.get('/', (req, res, next) => {
    res.send('Howdy! this is BEAPIZER Have a nice day ahead ;-)')
}) 

module.exports = router


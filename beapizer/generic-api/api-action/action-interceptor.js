const beapizerUtil = require('../util/util');

const intercepCall = (parameter={}) => async (req, res, next) => {
    beapizerUtil.authorizationGuard(req, res, next);
    return 
}

module.exports = {intercepCall}
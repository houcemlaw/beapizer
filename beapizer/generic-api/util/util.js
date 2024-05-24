
/**
 * authorizationGuard will be implemented once authorization capabilities are added to the project
 * 
 */
const authorizationGuard = async (req, res, next) => {
  
  if (1===1){
    next();
  } else {
    next({
      error: error,
      status: 401,
      message: 'Unauthorized request'
    });
  }
}


module.exports = {
  authorizationGuard
} 
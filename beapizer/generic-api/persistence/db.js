const mongodb = require('./mongodb/db-init');
var DS_DIALECT = process.env.DS_DIALECT;

if (!DS_DIALECT){
    DS_DIALECT = 'mongodb'
}

console.info(`Using the database dialect: ======> ${DS_DIALECT}`);

initializeDataBase = (DS_DIALECT) => {
    switch(DS_DIALECT) {
        case 'mongodb':
            mongodb.init()
          break;
        case 'mysql':
          /// TO-DO: implement MySQL db dialect
          break;
        default:
            //Default to 'mongodb'
            mongodb.init()
      }
}

module.exports = {
    initializeDataBase: (DS_DIALECT) => {
        return initializeDataBase(DS_DIALECT);
    },
    DS_DIALECT: DS_DIALECT
}
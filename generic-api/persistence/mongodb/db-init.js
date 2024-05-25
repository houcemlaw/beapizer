const mongoose = require('mongoose')

var dbURL = process.env.DS_URL;
const dbHost = process.env.DB_HOST ;
var dbPort = !process.env.DB_PORT ? 80 : process.env.DB_PORT;
const dbUser = process.env.DB_USR;
const dbPasswd = process.env.DB_PASSWD;
const dbName = process.env.DB_NAME

init = () => {
    dbURL = !dbURL ? `mongodb+srv://${dbUser}:${dbPasswd}@${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority` : dbURL;
    console.log("Using the following URL \n ==> ", dbURL);
    mongoose.set('debug', true) // print additional debug queries information
    /**
     * starting mongoose 6 :
     * useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. 
     * Mongoose > 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, 
     * and useFindAndModify is false. 
     */
    // mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true,  
    //     useCreateIndex: true, useFindAndModify: false })
        
    mongoose.connect(dbURL);
    mongoose.connection.on('connected', () => {
        console.log("Mongoose connection is open to ", dbURL);
    });

    mongoose.connection.on('error', (err) => {
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', () => { 
        console.log("Mongoose connection is disconnected");
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(()=> {
            console.log("Mongoose connection is disconnected on SIGINT event");
            process.exit(0)
        });
    });

    process.on('SIGHUP', ()=> {
        mongoose.connection.close(()=> {
            console.log("Mongoose connection is disconnected on SIGHUP event");
            process.exit(0)
        });
    });

    process.on('SIGBREAK', ()=> {
        mongoose.connection.close(()=> {
            console.log("Mongoose connection is disconnected on SIGBREAK event");
            process.exit(0)
        });
    });
}

module.exports = {
    init: () => {
        return init();
    }
}
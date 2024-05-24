/**
 * request has been deprecated so this api-utility will be updated accordingly in the futures
 */
// const request = require('request')


// const apiGet = (url,headers) => {

//   const requestOptions = {
//       url: url,
//       method: 'GET',
//       json: true,
//     };
//     if (headers){
//       requestOptions.headers =  headers;
//     }  
//     return new Promise((resolve, reject) => {
//       request(requestOptions, (err, res, body) => {
//         if (err){ 
//           reject(err);
//           return;
//         }
//         if (res && res.statusCode !== 200 && res.statusCode !== 201) {
//           reject(res);
//           return;
//         }
//         resolve(body);
//       });
//   })
// }

// const apiPost = (url,headers,body) => {

//     const requestOptions = {
//         url: url,
//         method: 'POST',
//         json: true,
//       };
//       if (headers){
//         requestOptions.headers =  headers;
//       }
//       if(body){
//         requestOptions.body =  body;
//       }
    
//       return new Promise((resolve, reject) => {
//         request(requestOptions, (err, res, body) => {
//           if (err){ 
//             reject(err);
//             return;
//           }
//           if (res && res.statusCode !== 200 && res.statusCode !== 201) {
//             reject(res);
//             return;
//           }
//           resolve(body);
//         });
//     })
// }

// const apiPatch = (url,headers,body) => {

//   const requestOptions = {
//       url: url,
//       method: 'PATCH',
//       json: true,
//     };
//     if (headers){
//       requestOptions.headers =  headers;
//     }
//     if(body){
//       requestOptions.body =  body;
//     }
  
//     return new Promise((resolve, reject) => {
//       request(requestOptions, (err, res, body) => {
//         if (err){ 
//           reject(err);
//           return;
//         }
//         if (res && res.statusCode !== 200 && res.statusCode !== 201) {
//           reject(res);
//           return;
//         }
//         resolve(body);
//       });
//   })
// }


// module.exports = {
//   apiGet,  
//   apiPost,
//   apiPatch
// }




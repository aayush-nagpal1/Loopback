'use strict';
const jwt = require('jsonwebtoken');
const request = require('request');
const Response = require('responselike');
const secret = 'supersecret'; // remove this line after merging the code with CWA.

module.exports = function(Auth) {
    Auth.authenticate = function(username,password,cb){
        if(username && password) {
                  let users =[ 
                    {
                        username : "aayush",
                        password : "1234"
                    },
                    {
                        username : "manoj",
                        password : "abc"
                    }
                  ]    
                  if(users instanceof Array) {
                      let userData = users.filter(user => user.username == username && user.password == password);
                      if(userData.length>0) {
                          let token = jwt.sign({ username: username }, secret, { expiresIn: 86400 });
                          cb(null, 200,token,);
                      } else {
                        let errorMsg = 'Unauthorized: Username or Password is incorrect'
                        cb(null, 401, errorMsg);
                      }
                  }
                
             // });
            } else {
              let  errorMsg = 'Bad request: Username or Password is not provided';
              cb(null, 400, errorMsg);
            }
    }

    Auth.remoteMethod(
        'authenticate', {
          http: {
            path: '/authenticate',
            verb: 'post'
          },
          accepts: [
            {arg: 'username', type: 'string'},
            {arg: 'password',  type: 'number'},
         ],
          returns:[
              {arg: 'status',type: 'number'},
              {arg: 'message',type: 'string'}]
        }
    );

};

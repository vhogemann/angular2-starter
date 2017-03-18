'use strict';
var jsonServer = require('gulp-json-srv');

var server = jsonServer.create({
    port: 25000,
    rewriteRules :{
        // '/example/paht/:id' : '/users/:id'
    },
    customRoutes : {
        '/example' : {
            method : 'post',
            handler : function(req, res) {
                res.json({ok:true});
            }
        }
    }
});

module.exports = server;
/**
 *
 */
angular.module('UserModule')
    .factory('UserService', ['$http',
        function($http) {


            return {
                create: function(data) {
                    console.log(data);
                    return $http.post('/user/create', data);
                },
                update: function(data) {
                    return $http.post('/user/update', data);
                },
                login:function (data) {
                	return $http.post('/user/login', data);
                },
                get:function () {
                	
                }
            };


        }
    ]);
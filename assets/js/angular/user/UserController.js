/* Controllers */

angular.module('UserModule')
    .controller('signUpFormController', ['$scope', 'toastr', 'UserService', 'errorService',
        function($scope, toastr, UserService, errorService) {
            $scope.signupForm = {};

            $scope.submitSignupForm = function() {
                var data = {
                    email: $scope.user.email,
                    fullName: $scope.user.fullName,
                    mobile: $scope.user.mobile,
                    password: $scope.user.password,
                    passwordConfirmation: $scope.user.passwordConfirmation,
                    username: $scope.user.username
                }
                console.log(data);
                UserService.create(data).success(function(chuck, status) {
                   
                    toastr.success('¡Información ingresada exitosamente!', '', {
                        closeButton: true
                    });
                    window.location = '/user/index';
                }).catch(function(err) {
                    alert('entre');
                    alert(JSON.stringify(err));
                	console.log(err);

                    toastr.error(errorService.error(err), 'Error', {
                        closeButton: true
                    });                    
                })
                /*.finally(function() {
                    // body...
                    toastr.error('Usuario creado exitosamente',"Error");
                    console.log('Intente Crear');
                })*/
                ;
            }


        }
    ])
/**
 * Controlador para la vista index de user
 */
.controller('getUserController', ['$scope', 'toastr', 'UserService',
    function($scope, toastr, UserService) {
    	UserService.get(id)
    }
]);
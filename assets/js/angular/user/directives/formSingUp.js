angular.module('UserModule').directive('userInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/angular/user/directives/userInfo.html' 
  }; 
});
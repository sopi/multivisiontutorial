angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http){
    $scope.signin = function(username, password)
    {
        console.log('send user: ' + username);
       $http
           .post('/login', { username: username, password: password })
           .then(function (response) {
               if(response.data.success){
                  console.log('logged in!');
               }else{
                   console.log('failed log in');
               }
           })
    }
});
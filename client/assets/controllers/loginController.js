app.controller('loginController', ['patientFactory','$scope','$location', '$cookies', '$routeParams', function(patientFactory, $scope, $location, $cookies, $routeParams) {

  console.log('login controller loaded');

  $scope.patients = {};

  var index = function(){
    var cookies = $cookies.getAll();
    console.log(cookies);
  }
  index();

  $scope.loginPatient = function(){
    console.log('patient entered info:', $scope.patient);
    if ($scope.patient == undefined) {
      $scope.login_error = "enter your name";
    } else {
      $scope.login_error = "";
      patientFactory.login($scope.patient, function(data){
        // console.log('data is', data);
        if(data.data.errors){
          $scope.login_error = data.data.errors.name.message;
        } else if (data.data == null) {
          $scope.login_error = 'something went wrong'
        } else {
          $cookies.put('uid', data.data._id);
          var patientCookie = $cookies.get('uid');
          // console.log(userCookie);
          $scope.patient = {};
          $location.url('/dashboard');
        }
      })
    }
  }

}]);

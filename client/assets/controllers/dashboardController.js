app.controller('dashboardController', ['patientFactory', 'appointmentFactory', '$scope', '$location', '$cookies', '$routeParams', function(patientFactory, appointmentFactory, $scope, $location, $cookies, $routeParams){

  console.log('dashboard controller loaded');

  $scope.patients = {};

  var index = function(){
    var cookies = $cookies.getAll();
    // console.log('cookies: ', cookies);
    if (!('uid' in cookies)){
      $location.url('/')
      console.log('patient not logged in');
    } else {
      var patientCookie = $cookies.get('uid');
      // console.log(userCookie);
      var showPatient = function(id){
        patientFactory.show(id, function(data){
          $scope.patient = data.data;
          // console.log('data is:', data.data);
        })
      }

      var showAppointments = function(){
        appointmentFactory.showAll(function(data){
          $scope.appointments = data.data.appointments;
          // console.log('all the appointments:', data.data.appointments);
        });
      }

      showPatient(patientCookie);
      showAppointments();
    }
  }

  index();

  $scope.logoutPatient = function(){
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) { $cookies.remove(k); });
    $location.url('/');
  }

  $scope.deleteAppointment = function(id){
    appointmentFactory.delete(id, function(data){
      if (data.data.errors){
        console.log(data.data.errors);
        $scope.errors = data.data.errors;
      } else {
        console.log(data);
      }
    })
    index();
  }

}])

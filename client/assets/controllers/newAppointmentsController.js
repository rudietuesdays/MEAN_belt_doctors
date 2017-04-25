app.controller('newAppointmentsController', ['$scope', '$location', '$cookies', '$routeParams', 'patientFactory', 'appointmentFactory', function($scope, $location, $cookies, $routeParams, patientFactory, appointmentFactory){

  console.log('new appointments controller loaded');

  $scope.appointments = {};

  var index = function(){
    var cookies = $cookies.getAll();
    // console.log('cookies: ', cookies);
    if (!('uid' in cookies)){
      $location.url('/')
      console.log('patient not logged in');
    } else {
      var patientCookie = $cookies.get('uid');
      var showPatient = function(id){
        patientFactory.show(id, function(data){
          $scope.patient = data.data;
          // console.log('data is:', data.data);
        })
      var today = new Date().toISOString().split('T')[0];
      document.getElementsByName("apptDate")[0].setAttribute('min', today);
      }
      showPatient(patientCookie)
    }
  }

  index();

  $scope.createAppointment = function(id){
    $scope.errors = {};
    $scope.date_error = '';
    var now = moment();
    if (now._d > $scope.newAppointment.date){
      console.log('date error');
      $scope.date_error = 'appointment must be scheduled for a future date';
    } else {
      appointmentFactory.create(id, $scope.newAppointment, function(data){
        if (data.data.errors){
          console.log('errors: ', data.data);
          $scope.errors = data.data.errors;
          $scope.newAppointment = {};
        } else {
          $scope.errors = ""
          console.log('new appointment created: ', data);
          $location.url('/dashboard');
        }
      })
    }
  }

}])

app.factory('patientFactory', ['$http', function($http) {

  console.log('patient factory loaded');

  var patients = [];
  var patient = {};
  var factory = {};

  factory.login = function(patient, callback){
    $http.post('/login', patient)
    .then(function(returned_data){
      if(typeof(callback)== 'function'){
        callback(returned_data);
        if(returned_data.errors){
          console.log('ERRORS: ', returned_data.data);
        } else {console.log('returned data: ', returned_data);}
      }
    })
  }

  factory.show = function(uid, callback){
    $http.get('/patients/' + uid)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
      }
    })
  }

  return factory;

}]);

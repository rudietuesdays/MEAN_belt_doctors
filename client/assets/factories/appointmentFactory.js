app.factory('appointmentFactory', ['$http', function($http){

  var appointments = [];
  var appointment = {};
  var factory = {};

  factory.showAll = function(callback){
    $http.get('/appointments')
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
        // console.log(returned_data);
      }
    })
  };

  factory.create = function(id, newAppointment, callback){
    console.log(id, newAppointment);
    $http.post('/'+id+'/appointments', newAppointment)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
      }
    })
  }

  factory.delete = function(id, callback){
    $http.delete('/appointments/'+id)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }

  return factory;
}])

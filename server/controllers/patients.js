console.log('loading patients controller...');
var mongoose = require('mongoose');
var Patient = mongoose.model('Patient')


module.exports = {
  create: function(req, res){
    console.log('in login function');
    Patient.findOne({name: req.body.name}, function(err, patient){
      if (patient) {
        console.log('patient found in db: ', patient);
        res.json({_id: patient._id});
      } else {
        var patient = new Patient(req.body);
        // console.log('patient: ', patient);
        patient.save(
          function(err, patient){
            if (err){
              res.json(err);
            } else {res.json(patient)}
          }
        )
      }
    })
  },

  show: function(req, res){
    console.log('in patient show function');
    Patient.findOne({_id: req.params.id},
    function(err, patient){
      if(err){console.log(err);}
      res.json(patient);
    })
  }
}

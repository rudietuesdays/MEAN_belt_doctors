console.log('loading appointments controller...');
var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
var Patient = mongoose.model('Patient');

module.exports = {

  index: function(req, res) {
    Appointment.find({})
    .populate('_patient')
    .exec(function(err, appointments){
      if(err){console.log(err);}
      res.json({appointments});
    });
  },

  create: function(req, res) {
    console.log('in appointment create fx');
    Patient.findOne({_id: req.params.id}, (err, patient) => {
      if (err) {console.log(err);}
      var appointment = new Appointment({
        _patient: patient.id,
        date: req.body.date,
        time: req.body.time,
        complaint: req.body.complaint
      });
      appointment.save(
        (err, appointment) => {
          if(err){
            console.log(err);
            res.json(err);
          }
          else {
            console.log('appointment created');
            res.json(appointment);
          }
        }
      )
    })
  },

  delete: function(req, res){
    console.log('in delete appt fx');
    Appointment.remove({_id: req.params.id}, function(err, result){
      if (err) { console.log(err); }
      console.log('appointment deleted');
      res.json('appointment deleted')
    })
  }
}

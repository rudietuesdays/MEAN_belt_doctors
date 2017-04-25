console.log('loading appointments controller...');
var mongoose = require('mongoose');
var moment = require('moment');
moment().format();
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
    Appointment.find({date: req.body.date}, function(err, appts){
      if (appts.length >= 3){
        res.json({
          errors: {
            message: 'no availability left on this day',
            kind: 'what did not work',
            path: 'appointment create',
            value: '>= 3 date validation error'
          }
        })
      } else {
          Appointment.findOne({_patient: req.params.id, date: req.body.date}, (err, appt) => {
            if (err) {console.log(err);};
            if (appt) {
              res.json({
                errors: {
                  message: 'patient already has an appointment on this day',
                  kind: 'what did not work',
                  path: 'appointment create',
                  value: 'date validation error'
                }
              })
            } else {
              var appointment = new Appointment({
                _patient: req.params.id,
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
            }

          })
        }
      }
    );
  },

  delete: function(req, res){
    console.log('in delete appt fx');
    var today = moment().startOf('day');
    var tomorrow  = moment().startOf('day').add(1,'days');
    console.log(today, tomorrow);
    Appointment.findOne({_id: req.params.id}, function(err, appt){
      if (err) {
        res.json({
          errors: {
            message: 'an error occurred',
            kind: 'what did not work',
            path: 'appointment delete',
            value: '<= 1 date validation error'
          }
        })
      };
      var apptDate = moment(appt.date)
      console.log((apptDate));
      if ((moment(apptDate).isSame(moment(today))) || (moment(apptDate).isSame(moment(tomorrow)))){
        res.json({
          errors: {
            message: 'cancelations must be at least 24 hours ahead',
            kind: 'what did not work',
            path: 'appointment delete',
            value: '<= 1 date validation error'
          }
        })
      } else {
        Appointment.remove({_id: req.params.id}, function(err, result){
          if (err) { console.log(err); }
          console.log('appointment deleted');
          res.json('appointment deleted')
        })
      }
    })

  }
}

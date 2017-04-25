console.log('loading appointment model...');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

// var today = new Date();

var dateValidator = [
  validate({
    validator: 'isAfter',
    message: 'appointment cannot be in the past'
  })
];

var AppointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'enter desired date'],
    validate: dateValidator
  },

  time: {
    type: String,
		required: [true, 'select a time']
  },

  complaint: {
    type: String,
		required: [true, 'enter reason for coming in'],
    minlength: [10, 'enter a more detailed complaint']
  },

  _patient: {type: Schema.Types.ObjectId, ref: 'Patient'}

},{timestamps:true})

mongoose.model('Appointment', AppointmentSchema);

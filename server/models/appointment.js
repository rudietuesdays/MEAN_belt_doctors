console.log('loading appointment model...');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'enter desired date'],
  },

  time: {
    type: Number,
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

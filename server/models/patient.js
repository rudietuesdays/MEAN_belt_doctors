console.log('loading patient model...');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
	name: {
		type: String,
		required: [true, 'enter your name']
	},

},{timestamps:true})

mongoose.model('Patient', PatientSchema);

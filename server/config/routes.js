var patients = require('../controllers/patients.js')
var appointments = require('../controllers/appointments.js')

module.exports = function(app){
	// patient routes
	app.post('/login', patients.create);
	app.get('/patients/:id', patients.show);

	// appointment routes
	app.get('/appointments', appointments.index);
	app.post('/:id/appointments', appointments.create)
	app.delete('/appointments/:id', appointments.delete);

}

var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/', { templateUrl: 'partials/login.html'})
  .when('/dashboard', { templateUrl: 'partials/dashboard.html'})
  .when('/new_appointment', {templateUrl:'partials/newAppointment.html'})
  .otherwise({
    redirectTo: '/'
  });
// Routes to load your new and edit pages with new and edit controllers attached to them!
});

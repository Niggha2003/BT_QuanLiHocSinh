angular.module('myApp').config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './views/student.html',
      controller: 'StudentController',
    })
    .when('/student', {
      templateUrl: './views/student.html',
      controller: 'StudentController',
    })
    .when('/course', {
      templateUrl: './views/course.html',
      controller: 'CourseController',
    });
});

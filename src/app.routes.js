app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './src/views/student.html',
      controller: 'StudentController',
    })
    .when('/student', {
      templateUrl: './src/views/student.html',
      controller: 'StudentController',
    })
    .when('/course', {
      templateUrl: './src/views/course.html',
      controller: 'CourseController',
    });
});

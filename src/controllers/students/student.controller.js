import studentFunc from '../../services/studentFunc.js';
import studentDialogOpen from './studentDialogOpen.js';
import courseFunc from '../../services/courseFunc.js';

app.controller('StudentController', function ($scope, $mdDialog) {
  $scope.studentTableTitles = ['#', 'Họ và tên', 'Tuổi', 'Lớp', 'Thao tác'];

  // mặc định trạng thái xem danh sách sinh viên là tất cả
  $scope.studentViewCourse = 'all';

  // danh sách lớp cho sinh viên
  $scope.courseList = courseFunc.getCourses();

  $scope.students = studentFunc.getStudents();

  /*
   * @birthday: Date, ngày tháng sinh của sinh viên
   * Tính tuổi của sinh viên
   */
  $scope.calculateAge = function (birthday) {
    var birthDate = new Date(birthday);
    var age = new Date().getFullYear() - birthDate.getFullYear();

    return age;
  };

  /*
   * Tìm kiếm thông tin sinh viên dựa trên studentViewCourse
   */
  $scope.filterByCourse = function () {
    $scope.students = studentFunc.getStudents();

    $scope.students = $scope.students.filter(function (student) {
      return student.course.includes($scope.studentViewCourse);
    });
  };

  /*
   * @index: Integer, index của sinh viên trong 'students'
   * Xóa sinh viên trong 'students'
   */
  $scope.deleteStudent = function (index) {
    studentFunc.deleteStudent(index);
    $scope.students = studentFunc.getStudents();
  };

  /*
   * Mở dialog
   */
  $scope.studentDialogOpen = function (ev, dialogTitle, index, student) {
    studentDialogOpen(ev, dialogTitle, index, student, $scope, $mdDialog);
  };
});

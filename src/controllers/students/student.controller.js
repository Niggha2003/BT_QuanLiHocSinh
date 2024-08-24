import studentFunc from '../../services/studentFunc.js';
import studentDialogOpen from './studentDialogOpen.js';
import courseFunc from '../../services/courseFunc.js';

angular.module('myApp').controller('StudentController', function ($scope, $mdDialog) {
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
   * Tìm kiếm thông tin sinh viên
   */
  $scope.filter = function () {
    $scope.students = studentFunc.getStudents();
    $scope.filterByCourse();
    $scope.filterByText();
  };

  /*
   * Tìm kiếm thông tin sinh viên dựa trên studentViewCourse
   */
  $scope.filterByCourse = function () {
    if ($scope.studentViewCourse === 'all') {
      return;
    }
    $scope.students = $scope.students.filter(function (student) {
      return student.course.name === $scope.studentViewCourse;
    });
  };

  /*
   * Tìm kiếm thông tin sinh viên dựa trên studentFindInput
   */
  $scope.filterByText = function () {
    if (!$scope.studentFindInput) {
      return;
    }

    $scope.students = $scope.students.filter(function (student) {
      var birthDate = new Date(student.birthday);
      var age = new Date().getFullYear() - birthDate.getFullYear();

      return (
        student.name.toLowerCase().includes($scope.studentFindInput) ||
        age.toString().toLowerCase().includes($scope.studentFindInput) ||
        student.course.name.toLowerCase().includes($scope.studentFindInput)
      );
    });
  };

  /*
   * @id: Integer, id của sinh viên trong 'students'
   * Xóa sinh viên trong 'students'
   */
  $scope.deleteStudent = function (id) {
    studentFunc.deleteStudent(id);
    $scope.filter();
  };

  /*
   * Mở dialog
   */
  $scope.studentDialogOpen = function (ev, dialogTitle, id, student) {
    studentDialogOpen(ev, dialogTitle, id, student, $scope, $mdDialog);
  };

  /*
   * Hàm nhận kết quả từ directive khi paginator thay đổi
   * Thay đổi trang mở hiện tại
   */
  $scope.updatePaginatedStudents = function (paginatedItems) {
    $scope.paginatedStudents = paginatedItems;
  };
});

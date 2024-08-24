import courseFunc from '../../services/courseFunc.js';
import courseDialogOpen from './courseDialogOpen.js';

angular.module('myApp').controller('CourseController', function ($scope, $mdDialog) {
  $scope.courses = courseFunc.getCourses();
  $scope.courseTableTitles = ['#', 'Lớp', 'Thao tác'];

  /*
   * Xóa lớp học
   */
  $scope.deleteCourse = function (id) {
    courseFunc.deleteCourse(id);
    $scope.courses = courseFunc.getCourses();
  };

  /*
   * Mở dialog
   */
  $scope.courseDialogOpen = function (ev, dialogTitle, id, course) {
    courseDialogOpen(ev, dialogTitle, id, course, $scope, $mdDialog);
  };

  /*
   * Hàm nhận kết quả từ directive khi paginator thay đổi
   */
  $scope.updatePaginatedCourses = function (paginatedItems) {
    $scope.paginatedCourses = paginatedItems;
  };
});

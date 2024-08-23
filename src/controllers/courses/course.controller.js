import courseFunc from '../../services/courseFunc.js';
import courseKeyFunc from '../../services/courseKeyFunc.js';
import validateCourseData from '../../services/validateCourseData.js';
import courseDialogOpen from './courseDialogOpen.js';

app.controller('CourseController', function ($scope, $mdDialog) {
  $scope.courses;
  $scope.tableCourseData;
  $scope.courseTableTitles = ['#', 'Lớp', 'Thao tác'];

  // khởi tạo danh sách các lớp
  renderCourseData();

  /*
   * Xóa lớp học
   */
  $scope.deleteCourse = function (index) {
    courseFunc.deleteCourse(index);
    renderCourseData();
  };

  /*
   * Xóa lớp bao
   */
  $scope.deleteCourseKey = function (name) {
    courseKeyFunc.deleteCourseKey(name);
    renderCourseData();
  };

  /*
   * Render giao diện data lớp học
   */
  function renderCourseData() {
    $scope.courses = courseFunc.getCourses();
    $scope.tableCourseData = validateCourseData($scope.courses);
  }

  /*
   * Mở dialog
   */
  $scope.courseDialogOpen = function (ev, dialogTitle, index, course, oldCourseKeyName) {
    courseDialogOpen(ev, dialogTitle, index, course, oldCourseKeyName, $scope, $mdDialog);
  };

  /*
   * Hàm nhận kết quả từ directive khi paginator thay đổi
   */
  $scope.updatePaginatedCourses = function (paginatedItems) {
    $scope.paginatedCourses = paginatedItems;
  };
});

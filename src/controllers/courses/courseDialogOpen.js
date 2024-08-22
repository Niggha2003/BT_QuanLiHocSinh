import courseFunc from '../../services/courseFunc.js';
import validateCourseData from '../../services/validateCourseData.js';

/*
 * @dialogTitle: String, loại dialog - có thể là update, add
 * @index: Integer, index của lớp học được chọn để mở dialog
 * @course: Object, thông tin lớp
 * @oldCourseKeyName: String, tên cũ của lớp bao muỗn thay đổi
 * Mở giao diện dialog
 */
var courseDialogOpen = function (ev, dialogTitle, index, course, oldCourseKeyName, $scope, $mdDialog) {
  $mdDialog
    .show({
      controller: 'CourseDialogController',
      templateUrl: './src/components/courseDialog/courseDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
      locals: {
        course: course,
        dialogTitle: dialogTitle,
        index: index,
        oldCourseKeyName: oldCourseKeyName,
      },
    })
    .then(
      function (newCoursesList) {
        if (newCoursesList) {
          $scope.courses = newCoursesList;
          $scope.tableCourseData = validateCourseData($scope.courses);
        }
      },
      function () {
        // Thực hiện gì đó khi dialog bị đóng, ví dụ click outside hoặc nhấn Cancel
        $scope.courses = courseFunc.getCourses();
        $scope.tableCourseData = validateCourseData($scope.courses);
      },
    );
};

export default courseDialogOpen;

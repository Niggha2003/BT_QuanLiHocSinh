import courseFunc from '../../services/courseFunc.js';

/*
 * @dialogTitle: String, loại dialog - có thể là update, add
 * @id: Integer, id của lớp học được chọn để mở dialog
 * @course: Object, thông tin lớp
 * Mở giao diện dialog
 */
var courseDialogOpen = function (ev, dialogTitle, id, course, $scope, $mdDialog) {
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
        id: id,
      },
    })
    .then(
      function (newCoursesList) {
        if (newCoursesList) {
          $scope.courses = newCoursesList;
        }
      },
      function () {
        // Thực hiện gì đó khi dialog bị đóng, ví dụ click outside hoặc nhấn Cancel
        $scope.courses = courseFunc.getCourses();
      },
    );
};

export default courseDialogOpen;

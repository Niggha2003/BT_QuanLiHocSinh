import studentFunc from '../../services/studentFunc.js';

/*
 * @dialogTitle: String, loại dialog - có thể là update, add
 * @index: Integer, index của sinh viên được chọn để mở dialog
 * @student: Object, thông tin sinh viên được mở
 * Mở giao diện dialog
 */
var studentDialogOpen = function (ev, dialogTitle, index, student, $scope, $mdDialog) {
  $mdDialog
    .show({
      controller: 'StudentDialogController',
      templateUrl: './src/components/studentDialog/studentDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
      locals: {
        student: student,
        dialogTitle: dialogTitle,
        index: index,
      },
    })
    .then(
      function (newStudentsList) {
        if (newStudentsList) {
          $scope.students = newStudentsList;
        }
      },
      function () {
        // Thực hiện gì đó khi dialog bị đóng, ví dụ click outside hoặc nhấn Cancel
        // reset lại data student
        $scope.students = studentFunc.getStudents();
      },
    );
};

export default studentDialogOpen;

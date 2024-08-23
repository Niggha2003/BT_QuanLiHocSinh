import studentFunc from '../../services/studentFunc.js';

/*
 * @dialogTitle: String, loại dialog - có thể là update, add
 * @id: Integer, id của sinh viên được chọn để mở dialog
 * @student: Object, thông tin sinh viên được mở
 * Mở giao diện dialog
 */
var studentDialogOpen = function (ev, dialogTitle, id, student, $scope, $mdDialog) {
  if (student && student.birthday) {
    // chuyển kiểu date string về kiểu date
    student.birthday = new Date(student.birthday);
  }

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
        id: id,
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

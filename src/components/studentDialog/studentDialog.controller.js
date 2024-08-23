import studentFunc from '../../services/studentFunc.js';
import courseFunc from '../../services/courseFunc.js';

app.controller('StudentDialogController', function ($scope, $mdDialog, student, dialogTitle, id) {
  $scope.student = student;

  // danh sách lớp cho sinh viên
  $scope.courseList = courseFunc.getCourses();

  // Hiển thị tiêu đề khác nhau cho từng chức năng
  $scope.dialogTitle = dialogTitle === 'add' ? 'Thêm sinh viên' : 'Sửa thông tin sinh viên';

  /*
   * Tắt đi và không làm gì thì trả lại mảng ban đầu cho students
   */
  $scope.closeDialog = function () {
    $mdDialog.cancel();
  };

  /*
   * Thay đổi hoặc thêm mới student tùy vào chức năng chọn
   */
  $scope.changeStudent = function () {
    if (!$scope.student || !$scope.student.name || !$scope.student.birthday || !$scope.student.course) {
      $scope.status = 'Thiếu thông tin';
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test($scope.student.name)) {
      $scope.status = 'Tên không được chứa số';
    } else {
      var result =
        dialogTitle === 'add' ? studentFunc.addStudent($scope.student) : studentFunc.updateStudent(id, $scope.student);
      $mdDialog.hide(result);
    }
  };
});

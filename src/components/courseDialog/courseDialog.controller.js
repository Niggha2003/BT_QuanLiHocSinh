import courseFunc from '../../services/courseFunc.js';

app.controller('CourseDialogController', function ($scope, $mdDialog, course, dialogTitle, id) {
  $scope.course = course;

  // Hiển thị tiêu đề khác nhau cho từng chức năng
  $scope.dialogTitle = dialogTitle;
  $scope.title = $scope.dialogTitle === 'add' ? 'Thêm lớp học' : 'Sửa thông tin lớp học';

  // tắt đi và không làm gì thì trả lại mảng ban đầu cho courses
  $scope.closeDialog = function () {
    $mdDialog.cancel();
  };

  /*
   * Thêm mới lớp
   * Nếu tên lớp này đã tồn tại thì báo lỗi
   */
  $scope.addCourse = function () {
    if (!$scope.course || !$scope.course.name) {
      $scope.status = 'Thiếu thông tin';
    } else {
      if (courseFunc.checkCourseExisted($scope.course)) {
        $scope.status = 'Tên lớp đã tồn tại';
        return;
      }
      var result = courseFunc.addCourse($scope.course);
      $mdDialog.hide(result);
    }
  };

  /*
   * Thay đổi thông tin lớp
   */
  $scope.changeCourse = function () {
    var result;

    if (!$scope.course || !$scope.course.name) {
      $scope.status = 'Thiếu thông tin';
    } else {
      if (courseFunc.checkCourseExisted($scope.course)) {
        $scope.status = 'Tên lớp đã tồn tại';
        return;
      }
      result = courseFunc.updateCourse(id, $scope.course);
      $mdDialog.hide(result);
    }
  };
});

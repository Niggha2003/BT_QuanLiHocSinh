import courseFunc from '../../services/courseFunc.js';
import courseKeyFunc from '../../services/courseKeyFunc.js';

app.controller('CourseDialogController', function ($scope, $mdDialog, course, dialogTitle, oldCourseKeyName, index) {
  $scope.course = course;

  // tên cũ của lớp bao nếu thực hiển chức năng sửa lớp bao
  $scope.oldCourseKeyName = oldCourseKeyName;

  // Lấy danh sách các lớp bao để cho người dùng chọn
  $scope.courseKeyList = courseKeyFunc.getCourseKeys();

  // Hiển thị tiêu đề khác nhau cho từng chức năng
  $scope.dialogTitle = dialogTitle;
  $scope.title = $scope.dialogTitle === 'add' ? 'Thêm lớp học' : 'Sửa thông tin lớp học';

  /*
   * Cài đặt chỉ được chọn lớp bao có sẵn hoặc tạo mới
   * Nếu type là select thì là chọn => course mới dạng text phải là null
   * Nếu type là text thì là course mới => dạng select thì phải về null
   */
  $scope.choseCourseKey = function (type) {
    if (type === 'select') {
      $scope.newCourseKeyName = null;
    }
    if (type === 'text') {
      $scope.course.course = null;
    }
  };

  // tắt đi và không làm gì thì trả lại mảng ban đầu cho courses
  $scope.closeDialog = function () {
    var courses = courseFunc.getCourses();
    $mdDialog.hide(courses);
  };

  /*
   * Thêm mới lớp
   * Nếu có newCourseKeyName thì tức là có một lớp bao mới
   * => lớp này sẽ thuộc lớp bao mới đó
   */
  $scope.addCourse = function () {
    if (!$scope.course || !$scope.course.name || (!$scope.course.course && !$scope.newCourseKeyName)) {
      $scope.status = 'Thiếu thông tin';
    } else {
      if ($scope.newCourseKeyName) {
        $scope.course.course = $scope.newCourseKeyName;
      }
      var result = courseFunc.addCourse($scope.course);
      $mdDialog.hide(result);
    }
  };

  /*
   * Thay đổi thông tin lớp
   * Nếu có oldCourseKeyName thì tức là đang thay đổi thông tin của 1 lớp bao
   * => lớp này sẽ thuộc lớp bao mới đó
   */
  $scope.changeCourse = function () {
    var result;
    if (oldCourseKeyName) {
      if (!$scope.newCourseKeyName) {
        $scope.status = 'Thiếu thông tin';
      } else {
        result = courseKeyFunc.updateCourseKey(oldCourseKeyName, $scope.newCourseKeyName);
      }
    } else {
      if (!$scope.course || !$scope.course.name || (!$scope.course.course && !$scope.newCourseKeyName)) {
        $scope.status = 'Thiếu thông tin';
      } else {
        if ($scope.newCourseKeyName) {
          $scope.course.course = $scope.newCourseKeyName;
        }

        /*
         * Vì scope.course có nhiều thuộc tính không cần thiết truyền vào từ bên ngoài,
         * nên ta chỉ lấy các thuộc tính cần thôi
         */
        $scope.course = {
          name: $scope.course.name,
          course: $scope.course.course,
        };

        result = courseFunc.updateCourse(index, $scope.course);
      }
    }
    $mdDialog.hide(result);
  };
});

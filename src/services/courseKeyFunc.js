import localStorageFunc from './localStorageFunc.js';
import studentFunc from './studentFunc.js';
import courseFunc from './courseFunc.js';

/*
 * Lấy danh sách lớp bao từ localStorage 'courses'
 */
function getCourseKeys() {
  var courses = courseFunc.getCourses();
  var newData = {};
  var courseKeys = [];

  courses.forEach((course) => {
    if (!newData[course.course]) {
      newData[course.course] = 'exist';
      courseKeys.push(course.course);
    }
  });

  return courseKeys;
}

/*
 * @oldCourseKeyName : tên cũ
 * @newCourseKeyName : tên mới
 * Sửa thông tin lớp bao trong localStorage 'courses'
 */
var updateCourseKey = function (oldCourseKeyName, newCourseKeyName) {
  var courses = courseFunc.getCourses();

  // Tạo bản sao của đối tượng và thay thế đối tượng cũ do nếu thay đổi phần tử theo index bị lỗi lỗi dupes
  courses = courses.map((course) => {
    if (course.course === oldCourseKeyName) {
      course.course = newCourseKeyName;
    }
    return course;
  });

  localStorageFunc.setData('courses', courses);

  return courses;
};

/*
 * @name: String, tên của lớp bao
 * Xóa thông tin lớp bao và các lớp thuộc vào nó và các sinh viên phụ thuộc vào các lớp
 *
 */
var deleteCourseKey = function (name) {
  var courses = courseFunc.getCourses();
  var students = studentFunc.getStudents();

  var deletedCourses = courses.filter(function (course) {
    return course.course === name;
  });

  deletedCourses.forEach(function (deletedCourse) {
    students = students.filter(function (student) {
      return student.course !== deletedCourse.name;
    });
  });

  courses = courses.filter(function (course) {
    return course.course !== name;
  });

  localStorageFunc.setData('students', students);
  localStorageFunc.setData('courses', courses);

  return courses;
};

var courseKeyFunc = {
  getCourseKeys: getCourseKeys,
  updateCourseKey: updateCourseKey,
  deleteCourseKey: deleteCourseKey,
};

export default courseKeyFunc;

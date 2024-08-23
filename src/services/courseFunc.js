import localStorageFunc from './localStorageFunc.js';
import studentFunc from './studentFunc.js';

/*
 * Lấy danh sách lớp học từ localStorage 'courses'
 */
function getCourses() {
  if (localStorageFunc.isDataExists('courses')) {
    return localStorageFunc.getData('courses');
  } else {
    return [];
  }
}

/*
 * @data: Object, thông tin lớp học mới
 * Thêm thông tin lớp học mới vào localStorage 'courses'
 */
var addCourse = function (data) {
  var courses = getCourses();

  courses.push(data);
  localStorageFunc.setData('courses', courses);

  return courses;
};

/*
 * @index: Integer, index của lớp đó trong 'courses'
 * @data: Object, thông tin lớp học mới
 * Sửa thông tin lớp học trong localStorage 'courses'
 */
var updateCourse = function (index, data) {
  var courses = getCourses();

  // Tạo bản sao của đối tượng và thay thế đối tượng cũ do nếu thay đổi phần tử theo index bị lỗi lỗi dupes
  courses = courses.map((course, idx) => (idx === index ? data : course));

  localStorageFunc.setData('courses', courses);

  return courses;
};

/*
 * @index: Integer, index của lớp đó trong 'courses'
 * Xóa thông tin lớp học khỏi localStorage 'courses' và các học sinh theo lớp học đó
 */
var deleteCourse = function (index) {
  var courses = getCourses();
  var deleteCourse = courses.splice(index, 1);
  var students = studentFunc.getStudents();

  students = students.filter(function (student) {
    return student.course !== deleteCourse[0].name;
  });

  localStorageFunc.setData('students', students);
  localStorageFunc.setData('courses', courses);

  return courses;
};

var courseFunc = {
  getCourses: getCourses,
  addCourse: addCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
};

export default courseFunc;

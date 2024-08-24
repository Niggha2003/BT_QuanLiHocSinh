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

  data.id = new Date().getTime();
  courses.push(data);
  localStorageFunc.setData('courses', courses);

  return courses;
};

/*
 * @id: Integer, id của lớp đó trong 'courses'
 * @data: Object, thông tin lớp học mới
 * Sửa thông tin lớp học trong localStorage 'courses'
 */
var updateCourse = function (id, data) {
  var courses = getCourses();
  var students = studentFunc.getStudents();

  var updatedCourse = courses.find(function (course) {
    return course.id === id;
  });

  // Tạo bản sao của đối tượng và thay thế đối tượng cũ do nếu thay đổi phần tử theo id bị lỗi lỗi dupes
  courses = courses.map((course) => (course.id === id ? data : course));

  students = students.map(function (student) {
    if (student.course === updatedCourse.name) {
      student.course = data.name;
    }
    return student;
  });

  localStorageFunc.setData('students', students);
  localStorageFunc.setData('courses', courses);

  return courses;
};

var checkCourseExisted = function (courseInfo) {
  var courses = getCourses();
  var checkCourse = courses.find(function (course) {
    return course.name === courseInfo.name;
  });

  if (checkCourse) {
    return true;
  }

  return false;
};

/*
 * @id: Integer, id của lớp đó trong 'courses'
 * Xóa thông tin lớp học khỏi localStorage 'courses' và các học sinh theo lớp học đó
 */
var deleteCourse = function (id) {
  var courses = getCourses();
  var students = studentFunc.getStudents();

  var coursesDeleteIndex = courses.findIndex(function (course) {
    return course.id === id;
  });

  var deleteCourse = courses.splice(coursesDeleteIndex, 1);

  students = students.map(function (student) {
    console.log(student.course, deleteCourse[0].name);
    if (student.course.name === deleteCourse[0].name) {
      student.course.beenDeleted = true;
    }
    return student;
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
  checkCourseExisted: checkCourseExisted,
};

export default courseFunc;

import localStorageFunc from './localStorageFunc.js';

/*
 * Lấy danh sách sinh viên từ localStorage 'students'
 */
function getStudents() {
  if (localStorageFunc.isDataExists('students')) {
    return localStorageFunc.getData('students');
  } else {
    return [];
  }
}

/*
 * @data: Object, Thông tin của sinh viên được thêm mới
 * Thêm thông tin sinh viên mới vào localStorage 'students'
 */
var addStudent = function (data) {
  var students = getStudents();

  students.push(data);
  localStorageFunc.setData('students', students);

  return students;
};

/*
 * @index: Integer, index của sinh viên đó trong 'students'
 * @data: Object, Thông tin của sinh viên được thay thế
 * Sửa thông tin sinh viên trong localStorage 'students'
 */
var updateStudent = function (index, data) {
  var students = localStorageFunc.getData('students');

  // Tạo bản sao của đối tượng và thay thế đối tượng cũ do nếu thay đổi phần tử theo index bị lỗi lỗi dupes
  students = students.map((student, idx) => (idx === index ? data : student));
  localStorageFunc.setData('students', students);

  return students;
};

/*
 * @index: Integer, index của sinh viên đó trong 'students'
 *  Xóa thông tin sinh viên khỏi localStorage 'students'
 */
var deleteStudent = function (index) {
  var students = localStorageFunc.getData('students');

  students.splice(index, 1);
  localStorageFunc.setData('students', students);

  return students;
};

var studentFunc = {
  getStudents: getStudents,
  addStudent: addStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
};

export default studentFunc;

/*
 * @courses: Array, mảng các lớp trong 'courses'
 * Chuyển dữ liệu lớp về dạng có thể render được trình bày dạng bảng
 */
var validateCourseData = function (courses) {
  if (!courses) {
    return [];
  }
  var newData = {};

  courses.forEach((course, index) => {
    if (!newData[course.course]) {
      newData[course.course] = [];
    }
    newData[course.course].push({ name: course.name, index: index });
  });

  var tableCourseData = [];

  Object.entries(newData).forEach(([key, value]) => {
    tableCourseData.push({ type: 'key', value: key });
    value.forEach((v) => {
      tableCourseData.push({ type: 'value', value: v.name, index: v.index, name: v.name, course: key });
    });
  });

  return tableCourseData;
};

export default validateCourseData;

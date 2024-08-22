app.filter('customStudentFilter', function () {
  return function (students, studentFindInput) {
    if (!studentFindInput) return students;

    var searchText = studentFindInput.toLowerCase();

    return students.filter(function (student) {
      var birthDate = new Date(student.birthday);
      var age = new Date().getFullYear() - birthDate.getFullYear();

      return (
        student.name.toLowerCase().includes(searchText) ||
        age.toString().toLowerCase().includes(searchText) ||
        student.course.toLowerCase().includes(searchText)
      );
    });
  };
});

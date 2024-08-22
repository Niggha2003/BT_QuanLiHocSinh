/*
 * Sửa hoặc thêm mới dữ liệu trong local storage
 */
var setData = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};

/*
 * Kiểm tra dữ liệu có tồn tại trong local storage không?
 */
var isDataExists = function (key) {
  var data = JSON.parse(localStorage.getItem(key));
  return !!data;
};

/*
 * @key: string, khóa dữ liệu trong local storage
 * Lấy dữ liệu từ key trong local storage
 */
var getData = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

var localStorageFunc = {
  setData: setData,
  isDataExists: isDataExists,
  getData: getData,
};

export default localStorageFunc;

angular.module('myApp').directive('paginationDirective', function () {
  return {
    restrict: 'E',
    scope: {
      /*
       * = là ràng buộc 2 chiều
       * @ là ràng buộc 1 chiều
       * & là ràng buộc function
       */
      items: '=', // Dữ liệu cần có
      itemsPerPage: '=', // Số lượng hiển thị trên mỗi trang
      onPageChange: '&', // Run khi thay đổi trang
    },
    template: `
      <div class="pagination-directive" layout="row" layout-align="center center">
        <!-- Chọn trang -->
        Số phần từ trên 1 trang: 
        <select class="mx-3" ng-model="itemsPerPage" ng-change="changeItemsPerPage()">
         <option ng-value="5">5</option>
         <option ng-value="10">10</option>
         <option ng-value="20">20</option>
        </select>

        <!-- Nút về trước -->
        <md-button class="md-raised" ng-click="goToPreviousPage()" ng-disabled="currentPage === 1">Trang trước</md-button>
        
        <!-- Hiển thị số trang hiện tại -->
        <span ng-repeat="page in pages" ng-click="goToPage(page)" ng-class="{active: currentPage === page, 'mx-2': true, page: true}">
          {{ page }}
        </span>

        <!-- Nút trang tiếp -->
        <md-button class="md-raised" ng-click="goToNextPage()" ng-disabled="currentPage === pages.length || pages.length === 0">Trang tiếp</md-button>
      </div>
    `,
    link: function (scope) {
      scope.currentPage = 1;

      scope.$watch(
        'items',
        function (newVal) {
          if (newVal) {
            scope.totalPages = Math.ceil(newVal.length / scope.itemsPerPage);
            // tạo 1 mảng có độ dài là scope.totalPages bao gồm các phần tử từ 1 đến nó
            scope.pages = Array.from({ length: scope.totalPages }, (_, i) => i + 1);
            scope.updatePaginatedItems();
          }
        },
        true,
      );

      scope.updatePaginatedItems = function () {
        const startIndex = (scope.currentPage - 1) * scope.itemsPerPage;
        const endIndex = startIndex + scope.itemsPerPage;
        const paginatedItems = scope.items.slice(startIndex, endIndex);

        // do đặc tính của angularJS nên phải truyền object trong đó: key là tham số định nghĩa ở hàm ánh xạ bên ngoài, còn value là giá trị
        scope.onPageChange({ paginatedItems: paginatedItems });
      };

      scope.goToPreviousPage = function () {
        if (scope.currentPage > 1) {
          scope.currentPage--;
          scope.updatePaginatedItems();
        }
      };

      scope.goToNextPage = function () {
        if (scope.currentPage < scope.totalPages) {
          scope.currentPage++;
          scope.updatePaginatedItems();
        }
      };

      scope.goToPage = function (page) {
        scope.currentPage = page;
        scope.updatePaginatedItems();
      };

      scope.changeItemsPerPage = function () {
        scope.currentPage = 1;
        scope.totalPages = Math.ceil(scope.items.length / scope.itemsPerPage);
        // tạo 1 mảng có độ dài là scope.totalPages bao gồm các phần tử từ 1 đến nó
        scope.pages = Array.from({ length: scope.totalPages }, (_, i) => i + 1);
        scope.updatePaginatedItems();
      };
    },
  };
});

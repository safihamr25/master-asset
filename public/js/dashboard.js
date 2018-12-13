var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', '$rootScope', '$window', function ($scope, $http, $rootScope, $window) {
   $scope.categories = ['Civil structure', 'Lightning & Electrical', 'Processing & Packaging', 'Plumbing', 'HVAC', 'F & F', 'Transportation'];
   $scope.categories_css = ['fa-building', 'fa-bolt', 'fa-box', 'fa-gavel', 'fa-temperature-low', 'fa-couch', 'fa-shuttle-van'];
   $scope.showCard = true;
   $scope.searchValue = [];
   $scope.filter = function (header, value) {
      $scope.searchValue[header] = value;
   }
   $scope.reverse = false;
   $scope.sort = function (header) {
      $scope.myOrderBy = header;
      $scope.reverse = !($scope.reverse);
   }
   $rootScope.fun = function () {
      console.log("in fun" + $rootScope.user)
      alert("fun");
      $rootScope.name = "safi";
   }
   var total = 1;
   var range = [];
   $rootScope.range = range
   $rootScope.increaseRange = function () {
      total += 1;
      range.push(total)
      $rootScope.range = range
   }
   $rootScope.decreaseRange = function (ele) {
      console.log("inside decrease range" + ele)
      id = '#' + ele;
      var elmn = angular.element(document.querySelector(id));
      elmn.remove();
      range.slice(-1);
      $rootScope.range = range;
   }
   $rootScope.select_template = function (a) {
      $rootScope.selectedTemplate = a;
      if (a == 2) {
         $rootScope.getLocation();
      }
   }
   $rootScope.getForm = function (a) {
      console.log("inside getForm")
      if ($rootScope.selectedTemplate == 1) {
         $rootScope.title = "Civil Structure"
         return '/forms/civil_structure'
      }
      else if ($rootScope.selectedTemplate == 2) {
         $rootScope.title = "Lightning & Electrical"
         return '/forms/lightning_electrical'
      }
      else if ($rootScope.selectedTemplate == 3) {
         $rootScope.title = "Plumbing"
         return '/forms/plumbing'
      }
      else if ($rootScope.selectedTemplate == 4) {
         $rootScope.title = "HVAC"
         return '/forms/hvac'
      }
      else if ($rootScope.selectedTemplate == 5) {
         $rootScope.title = "F & F"
         return '/forms/f_&_f'
      }
      else if ($rootScope.selectedTemplate == 6) {
         $rootScope.title = "Processing & Packaging"
         return '/forms/processing_packaging'
      }
      else {
         $rootScope.title = "Transportation"
         return '/forms/transportation'
      }
   }
   $rootScope.modalClose = function () {
      console.log("modal slose")
      $scope.showCard = true;
      $scope.submitCivilStructure(0);
   }
   $rootScope.submitCivilStructure = function (val) {
      data = $scope.data;
      console.log("data" + data)
      if (val != 1) {
         $scope.data = [];
      }
      else {
         $http({
            url: '/submitForm',
            method: 'POST',
            data: data,
            headers: { 'Content-Type': 'application/json' }
         }).then(function (response) {
            console.log(response);
            console.log(response.data);
            if (response.data == "success") {
               $rootScope.showAlertSuccess = true;
               $rootScope.message = "Record inserted successfully!!";
            }
            else {
               $rootScope.showAlertError = true;
               $rootScope.message = "Error!! Try again..";
            }
            alert('response data' + response.data);
            $scope.data = [];
            angular.element('#myModal').modal('hide');
         });
      }
   }
   $rootScope.getLocation = function () {
      console.log("reached getLocation")
      $http({
         url: '/getLocation',
         method: 'GET',
      }).then(function (response) {
         console.log(response);
         console.log(response.data);
         $rootScope.civilStructure = response.data;
      });
   }
   $scope.getSubLocation = function (val) {
      console.log("reached getSubLocation")
      data = { "id": val };
      $http({
         url: '/getSubLocation',
         method: 'POST',
         data: data,
         headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
         console.log(response);
         console.log(response.data);
         $rootScope.subLocation = response.data;
      });
      console.log("reached get sub location");
   }
   $scope.submitElectrical = function (val) {
      data = $scope.data;
      console.log("data" + data)
      if (val != 1) {
         $scope.data = [];
      }
      else {
         $http({
            url: '/submitElectrical',
            method: 'POST',
            data: data,
            headers: { 'Content-Type': 'application/json' }
         }).then(function (response) {
            console.log(response);
            console.log(response.data);
            if (response.data == "success") {
               $rootScope.showAlertSuccess = true;
               $rootScope.message = "Record inserted successfully!!";
            }
            else {
               $rootScope.showAlertError = true;
               $rootScope.message = "Error!! Try again..";
            }
            alert('response data' + response.data);
            $scope.data = [];
            angular.element('#myModal').modal('hide');
         });
      }
   }
   $scope.keys = [];
   $scope.getPager = function (totalItems, currentPage, pageSize) {
      currentPage = currentPage || 1;
      pageSize = pageSize || 10;
      var totalPages = Math.ceil(totalItems / pageSize);
      var startPage, endPage;
      if (totalPages <= 10) {
         startPage = 1;
         endPage = totalPages;
      } else {
         if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
         } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
         } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
         }
      }
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      var pages = [];
      for (i = startPage; i <= endPage; i++) {
         pages.push(i);
      }

      return {
         totalItems: totalItems,
         currentPage: currentPage,
         pageSize: pageSize,
         totalPages: totalPages,
         startPage: startPage,
         endPage: endPage,
         startIndex: startIndex,
         endIndex: endIndex,
         pages: pages
      };
   }
   $rootScope.getRecord = function (val) {
      console.log("here comes", val)
      if (val == 'home') {
         $("#record-layout").hide();
         $("#dashboard-layout").fadeIn(500);
      }
      else {
         $("#dashboard-layout").hide();
         $("#record-layout").fadeIn(500);
         data = { "id": val };
         $http({
            url: '/getRecord',
            method: 'POST',
            data: data,
            headers: { 'Content-Type': 'application/json' }
         }).then(function (response) {
            console.log(response);
            $scope.records = response.data;
            keys = [];
            values = [];
            var keepGoing = true;
            $scope.headers = [];
            angular.forEach(response.data, function (value, key) {
               if (keepGoing) {
                  angular.forEach(value, function (v, k) {
                     $scope.headers.push(k);
                  });
                  keepGoing = false;
               }
            });
            $scope.s = "jhhuuu"
            console.log($scope.headers);
            pager = {};
            setPage = setPage;
            initController();
            function initController() {
               setPage(1);
            }
            function setPage(page) {
               if (page < 1 || page > pager.totalPages) {
                  return;
               }
               $scope.pager = $scope.getPager($scope.records.length, page);
               console.log("pager")

               items = $scope.records.slice(pager.startIndex, pager.endIndex + 1);
            }
            angular.forEach(pager, function (key, value) {
               console.log("key :" + key + "vlue: " + value)
            });
         });
      }
   }






}]);
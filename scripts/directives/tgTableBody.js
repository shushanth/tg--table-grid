// @directive:tgTableBody(tg-table-body)
// @module:tableGrid
// @used:'E'(element)
// @description:used by tgTableGrid directive to create its body with the data


(function() {
  'use strict';


  angular.module('tableGrid')
    .directive('tgTableBody', tgTableBody);

  tgTableBody.$inject = [];


  //constructor:tgTableBody

  function tgTableBody() {

    //controller:tgTableBodyController
    var tgTableBodyController = function($scope,$filter,$rootScope) {

      var tgTableBodySelf = this;

      var orderByFilter = $filter('orderBy');

      tgTableBodySelf.predicateDefault = 'city';
      tgTableBodySelf.reverseDefault = false;
      tgTableBodySelf.pageSize = null;

      tgTableBodySelf.dataLimit = {pageSize:10};


     //listening for sort event
      var tgDataGridSortUnbind = $scope.$on('tgDataGridSort',function(event,options){
          var predicateFromView = options.sortByParamter;
          tgTableBodySelf.orderTableData(predicateFromView);
      });

      //listening for search event

      var tgDataGridSearchUnbind = $scope.$on('tgDataGridSearch',function(event,options){
          tgTableBodySelf.search = options;
      });

      //listening for pagination changes

      $scope.$on('tgPaginationPageChange',function(event,options){
        debugger;
            var pageSize = (angular.isString(options.defaultPageSize))? parseInt(options.defaultPageSize.trim()):options.defaultPageSize;
            tgTableBodySelf.dataLimit.pageSize = pageSize;
            tgTableBodySelf.tableData = tgTableBodySelf.tableGridData.slice(0,pageSize);


      });

      //order By sort filter executes on tgDataGridSort event
     tgTableBodySelf.orderTableData = function(predicateFromView) {
        tgTableBodySelf.predicateDefault = predicateFromView;
        tgTableBodySelf.reverseDefault = (tgTableBodySelf.predicateDefault === predicateFromView) ? !tgTableBodySelf.reverseDefault : false;
      };

      //sets the table Data
      tgTableBodySelf.setTableData = function(defaultPageNumber) {
        debugger;
        tgTableBodySelf.tableData = (!defaultPageNumber)? tgTableBodySelf.tableGridData.slice(defaultPageNumber,tgTableBodySelf.dataLimit.pageSize):tgTableBodySelf.tableGridData.slice(defaultPageNumber-tgTableBodySelf.dataLimit.pageSize,defaultPageNumber);

      };



      //set the header and grid data
      tgTableBodySelf.initGridData = function(tableConfig) {

        tgTableBodySelf.tableGridData = tableConfig.data;
        tgTableBodySelf.cellSelection = tableConfig.cellSelection[0];
        tgTableBodySelf.singleSelect = tableConfig.cellSelection[1];
        tgTableBodySelf.toggleSelect = tableConfig.cellSelection[2];
        tgTableBodySelf.setTableDataLimit = tgTableBodySelf.tableGridData.length;
        tgTableBodySelf.pageSize = tableConfig.pagination[1][0];
        tgTableBodySelf.setTableData(0);

      };

      tgTableBodySelf.getTableUpdatedData = function(){
        return tgTableBodySelf.tableData;
      };

      $rootScope.$on('dataUpdateOnPageNumberAction',function(event,paginationNumber){
        tgTableBodySelf.setTableData(tgTableBodySelf.dataLimit.pageSize*paginationNumber);
      });

      //clean up the events on $scope $destroy
      $scope.$on('$destroy',function(){
            tgDataGridSortUnbind();
            tgDataGridSearchUnbind();
      });


    };

    //link:tgTableBodyLink
    var tgTableBodyLink = function(scope, element, attrs, controllers) {
      var tgTableGridController = controllers[0],
        tgTableBodyController = controllers[1];
      tgTableBodyController.initGridData(tgTableGridController.getOptions());

    };



    return {

      restrict: 'E',
      replace: true,
      transclude: true,
      terminal:true,
      priority: 1000,
      require: ['^tgTableGrid', 'tgTableBody'],
      controller: ['$scope','$filter','$rootScope', tgTableBodyController],
      controllerAs: 'tgTableBody',
      link: tgTableBodyLink,
      templateUrl: '/views/templates/tgTableBody.html'
    };
  }

})();

(function(){
  'use strict';

  // @directive:tgTablePagination(tg-table-pagination)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:main directive for pagination

    angular.module('tableGrid').
           directive('tgTablePagination',tgTablePagination);

   //inject dependencies

     tgTablePagination.$inject = [];

 //constructor:tgTablePagination
   function tgTablePagination(){

      //controller

      var tgTablePaginationController = function($scope){

        var tgTablePaginationSelf = this;
        var tgTableGridDataCount = null;



        //pagination config
        tgTablePaginationSelf.paginationConfig = {};

        tgTablePaginationSelf.setPageSize = function(pageSizes,dataCount){
          tgTablePaginationSelf.paginationConfig.defaultPageSize = pageSizes[0];
          //use service here for sort
            tgTablePaginationSelf.paginationConfig.pageSizes = pageSizes.sort(function(a,b){
              return a-b;
            });
            tgTableGridDataCount = dataCount;
            tgTablePaginationSelf.emitEvent('tgPaginationPageChange',tgTablePaginationSelf.paginationConfig);
        };

        tgTablePaginationSelf.checkDisabledState = function(currentPageSize,isLast){

            var pageSizeDisabledRequied = (currentPageSize > tgTableGridDataCount);
                return pageSizeDisabledRequied;
        };

       //page size chage action
        tgTablePaginationSelf.pageSizeChangeAction = function(){
            tgTablePaginationSelf.emitEvent('tgPaginationPageChange',tgTablePaginationSelf.paginationConfig);
        };

        //common emit event
        tgTablePaginationSelf.emitEvent = function(event,pageSizeArgs){
          $scope.$emit(event,pageSizeArgs);
        };

        tgTablePaginationSelf.getGridDataCount = function(){
            return tgTableGridDataCount;
        };

        tgTablePaginationSelf.getDefaultPageSize = function(){
            return tgTablePaginationSelf.paginationConfig.defaultPageSize;
        };

      };

      //link:tgTablePaginationLink
      var tgTablePaginationLink = function(scope,element,attrs,controllers){

        var tgTableFooterController = controllers[0],
            tgTablePaginationController = controllers[1];

        tgTablePaginationController.setPageSize(tgTableFooterController.getPageSize(),tgTableFooterController.getItemsCount());


      };

     return{
       restrcit:'E',
       replace:true,
       require:['^tgTableFooter','tgTablePagination'],
       controller:['$scope',tgTablePaginationController],
       controllerAs:'tgTablePagination',
       link:tgTablePaginationLink,
       templateUrl:'/views/templates/tgTablePagination.html'
     };
   }

})();

(function(){
 'use strict';


//@directive:tgtablePageNumber(tg-table-page-number)
// @module:tableGrid
// @used:'E'(element)
// @description:page numbers in pagintaion

   angular.module('tableGrid')
          .directive('tgTablePageNumber',tgTablePageNumber);


    //inject dependencies

    tgTablePageNumber.$inject = ["tgTableGridHelpers","tgTablePageNumberHelpers"];

    //constructor:tgtablePageNumber

    function tgTablePageNumber(tgTableGridHelpers,tgTablePageNumberHelpers){

      //controller:tgTablePageNumberController

      var tgTablePageNumberController = function($scope,$timeout,$rootScope){


            var tgTablePageNumberControllerSelf = this;
            var timer = null;
            var tgPaginationChangeEventUnbind = null;
            tgTablePageNumberControllerSelf.tgTableMaxPageSize = null;
            tgTablePageNumberControllerSelf.gridDataCount = null;
            tgTablePageNumberControllerSelf.pageNumberConfig = {'pageSize':false,'pageLimitDefault':10,'currentPage':1};

            var emitEvent = function(emitEventName,emitArgs){
                $rootScope.$emit(emitEventName,emitArgs);
            };

            //kickoff actions for page numbers
            tgTablePageNumberControllerSelf.initPageNumberActions = function(gridDataCount,defaultPageSize){

              tgTablePageNumberControllerSelf.gridDataCount = gridDataCount;
              tgTablePageNumberControllerSelf.tgTableMaxPageSize = Math.round(gridDataCount/defaultPageSize);

              tgTablePageNumberControllerSelf.tgTablePageNumbers = tgTableGridHelpers.getAscendingNumberArray(tgTablePageNumberControllerSelf.tgTableMaxPageSize);
              tgTablePageNumberControllerSelf.tgTablePageNumbers.push(tgTablePageNumberControllerSelf.tgTablePageNumbers.length+1);

              if(tgTableGridHelpers.checkIfNumberHasDecimals(gridDataCount/defaultPageSize)){
                tgTablePageNumberControllerSelf.tgTableMaxPageSize+=1;
              }

              tgTablePageNumberControllerSelf.pageNumberConfig.pageSize = !tgTablePageNumberControllerSelf.pageNumberConfig.pageSize;
            };

            //listening to event change and updating the view
            tgPaginationChangeEventUnbind = $scope.$on('tgPaginationPageChange',function(event,options){
              var tgTableTableMaxPageSizeValue = tgTablePageNumberControllerSelf.gridDataCount/options.defaultPageSize.trim();
              tgTablePageNumberControllerSelf.pageNumberConfig.pageSize = !tgTablePageNumberControllerSelf.pageNumberConfig.pageSize;
              if(tgTableGridHelpers.checkIfNumberHasDecimals(tgTableTableMaxPageSizeValue)){
                tgTableTableMaxPageSizeValue+=1;
              }
                $timeout(function(){

                  tgTablePageNumberControllerSelf.tgTableMaxPageSize = Math.round(tgTableTableMaxPageSizeValue);
                  tgTablePageNumberControllerSelf.tgTablePageNumbers = tgTableGridHelpers.getAscendingNumberArray(tgTablePageNumberControllerSelf.tgTableMaxPageSize);
                  tgTablePageNumberControllerSelf.pageNumberConfig.pageSize = !tgTablePageNumberControllerSelf.pageNumberConfig.pageSize;
                },0);
            });

            tgTablePageNumberControllerSelf.changePageAction = function(element){
              var pageNumber = element.$parent.$index+1;

              tgTablePageNumberControllerSelf.pageNumberConfig.currentPage = pageNumber;

                if(tgTablePageNumberControllerSelf.tgTablePageNumbers>tgTablePageNumberControllerSelf.pageNumberConfig.pageLimitDefault){
                    tgTablePageNumberHelpers.handlePageNumbers(pageNumber);
                }

                tgTablePageNumberHelpers.activatePageButton(pageNumber);
                emitEvent('dataUpdateOnPageNumberAction',pageNumber);

            };

            var prevNextActionConfig = {
                action:function(){
                  var pageActionNumber = (this.action === 'prev')? tgTablePageNumberControllerSelf.pageNumberConfig.currentPage-1 :tgTablePageNumberControllerSelf.pageNumberConfig.currentPage+1;
                  tgTablePageNumberHelpers.activatePageButton(pageActionNumber);
                  emitEvent('dataUpdateOnPageNumberAction',pageActionNumber);
                  tgTablePageNumberControllerSelf.pageNumberConfig.currentPage = pageActionNumber;
                }

            };

            tgTablePageNumberControllerSelf.previousAction = function(){
                var pagePrev = {'action':'prev'};
                prevNextActionConfig.action.call(pagePrev);
                // var previousPageNumber = tgTablePageNumberControllerSelf.pageNumberConfig.currentPage-1;
                // tgTablePageNumberHelpers.activatePageButton(previousPageNumber);
                // emitEvent('dataUpdateOnPageNumberAction',previousPageNumber);
                // tgTablePageNumberControllerSelf.pageNumberConfig.currentPage = previousPageNumber;

            };

            tgTablePageNumberControllerSelf.nextAction = function(){
              var pagePrev = {'action':'next'};
              prevNextActionConfig.action.call(pagePrev);
              // var previousPageNumber = tgTablePageNumberControllerSelf.pageNumberConfig.currentPage-1;
              // tgTablePageNumberHelpers.activatePageButton(previousPageNumber);
              // emitEvent('dataUpdateOnPageNumberAction',previousPageNumber);
              // tgTablePageNumberControllerSelf.pageNumberConfig.currentPage = previousPageNumber;
            };



            $scope.$on('destroy',function(){
                if(timer)
                  timer.cancel();
                  tgPaginationChangeEventUnbind();
            });
      };

      //link:@pre-lnking:tgTablePageNumberLink
      var tgTablePageNumberLink = {

        pre:function(scope,element,attrs,controllers){
          var tgTablePaginationController = controllers[0],
              tgTablePageNumberController = controllers[1];
          tgTablePageNumberController.initPageNumberActions(tgTablePaginationController.getGridDataCount(),tgTablePaginationController.getDefaultPageSize());
        }
      };




        return{
          restrict:'E',
          replace: true,
          priority:999,
          require:['^tgTablePagination','tgTablePageNumber'],
          link:tgTablePageNumberLink,
          controller:['$scope','$timeout','$rootScope',tgTablePageNumberController],
          controllerAs:'tgTablePageNumber',
          templateUrl:'/views/templates/tgtablePageNumber.html'
        };
    }

})();

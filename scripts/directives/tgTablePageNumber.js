(function(){
 'use strict';


//@directive:tgtablePageNumber(tg-table-page-number)
// @module:tableGrid
// @used:'E'(element)
// @description:page numbers in pagintaion

   angular.module('tableGrid')
          .directive('tgTablePageNumber',tgTablePageNumber);


    //inject dependencies

    tgTablePageNumber.$inject = [];

    //constructor:tgtablePageNumber

    function tgTablePageNumber(){

      //controller:tgTablePageNumberController

      var tgTablePageNumberController = function($scope,$timeout,$rootScope){


            var tgTablePageNumberControllerSelf = this;
            var timer = null;
            var tgPaginationChangeEventUnbind = null;
            tgTablePageNumberControllerSelf.tgTableMaxPageSize = null;
            tgTablePageNumberControllerSelf.gridDataCount = null;
            tgTablePageNumberControllerSelf.showTgTablePageNumber = {'pageSize':false};

            //move this to services

            var checkIfNumberHasDecimals = function(num){
                return (num && (num%1 !==0));
            };


            //move to serivce

            var makeAscendingArray = function(arrayLength){
               return Array.apply(null,{length:arrayLength}).map(function(item,index){
                  return index+1;
               });



            };

            //kickoff actions for page numbers
            tgTablePageNumberControllerSelf.initPageNumberActions = function(gridDataCount,defaultPageSize){
              tgTablePageNumberControllerSelf.gridDataCount = gridDataCount;
              tgTablePageNumberControllerSelf.tgTableMaxPageSize = Math.round(gridDataCount/defaultPageSize);




              tgTablePageNumberControllerSelf.tgTablePageNumbers = makeAscendingArray(tgTablePageNumberControllerSelf.tgTableMaxPageSize);
              tgTablePageNumberControllerSelf.tgTablePageNumbers.push(tgTablePageNumberControllerSelf.tgTablePageNumbers.length+1);

              if(checkIfNumberHasDecimals(gridDataCount/defaultPageSize)){
                tgTablePageNumberControllerSelf.tgTableMaxPageSize+=1;
              }

              tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize = !tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize;
            };

            //listening to event change and updating the view
            tgPaginationChangeEventUnbind = $scope.$on('tgPaginationPageChange',function(event,options){
              var tgTableTableMaxPageSizeValue = tgTablePageNumberControllerSelf.gridDataCount/options.defaultPageSize.trim();
              tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize = !tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize;
              if(checkIfNumberHasDecimals(tgTableTableMaxPageSizeValue)){
                tgTableTableMaxPageSizeValue+=1;
              }
                $timeout(function(){

                  tgTablePageNumberControllerSelf.tgTableMaxPageSize = Math.round(tgTableTableMaxPageSizeValue);
                  tgTablePageNumberControllerSelf.tgTablePageNumbers = makeAscendingArray(tgTablePageNumberControllerSelf.tgTableMaxPageSize);
                  tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize = !tgTablePageNumberControllerSelf.showTgTablePageNumber.pageSize;
                },0);
            });

            tgTablePageNumberControllerSelf.changePageAction = function(pageNumber){
              
                $rootScope.$emit('dataUpdateOnPageNumberAction',pageNumber);
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
          require:['^tgTablePagination','tgTablePageNumber'],
          link:tgTablePageNumberLink,
          controller:['$scope','$timeout','$rootScope',tgTablePageNumberController],
          controllerAs:'tgTablePageNumber',
          templateUrl:'/views/templates/tgtablePageNumber.html'
        };
    }

})();

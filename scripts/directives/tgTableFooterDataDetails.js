(function(){

  'use strict';


    // @directive:tgTableFooterDataDetails(tg-table-footer-data-details)
    // @module:tableGrid
    // @used:'E'(element)
    // @description:shows the data details in the footer section

    angular.module('tableGrid')
           .directive('tgTableFooterDataDetails',tgTableFooterDataDetails);

    //inject dependencies

    tgTableFooterDataDetails.$inject  = [];

    //@constructor:tgTableFooterDataDetails

    function tgTableFooterDataDetails(){
      //controller:tgTableFooterDataDetailsController

      var tgTableFooterDataDetailsController = function(){

          var tgTableFooterDataDetailsControllerSelf = this;

          tgTableFooterDataDetailsControllerSelf.gridDataItemsCount = null;

          tgTableFooterDataDetailsControllerSelf.setGridDataItemsCount = function(count){
                tgTableFooterDataDetailsControllerSelf.gridDataItemsCount = count;
          };


      };


      //link:tgTableFooterDataDetailsLink

      var tgTableFooterDataDetailsLink = function(scope,element,attrs,controllers){

          var tgTableFooterController = controllers[0],
              tgTableFooterDataDetailsController = controllers[1];
              tgTableFooterDataDetailsController.setGridDataItemsCount(tgTableFooterController.getItemsCount());




      };

        return{

          restrict:'E',
          transclude:true,
          require:['^tgTableFooter','tgTableFooterDataDetails'],
          link:tgTableFooterDataDetailsLink,
          controller:tgTableFooterDataDetailsController,
          controllerAs:'tgTableFooterDataDetails',
          templateUrl:'/views/templates/tgTableFooterDetails.html'

        };
    }

})();

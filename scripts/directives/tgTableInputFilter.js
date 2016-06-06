(function(){

  'use strict';

  // @directive:tgTableInputFilter(tg-table-input-filter)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:used by tgTableGrid directive to create its header with the data

    angular.module('tableGrid')
           .directive('tgTableInputFilter',tgTableInputFilter);

    //inject dependencies

    tgTableInputFilter.$inject = [];

    //@constructor tgTableInputFilter

    function tgTableInputFilter(){

      //controller : tgTableInputFilterController

      var tgTableInputFilterController = function($scope){

        var tgTableInputFilterSelf = this;
        var tgTableHeaderController = null;

        tgTableInputFilterSelf.searchData = null;


        var removeCloseIconIfEmpty = function(searchOptionArgs){
          var searchInputKey = (searchOptionArgs)? Object.keys(searchOptionArgs) : null;
           if(!searchOptionArgs[searchInputKey]){
             tgTableInputFilterSelf.searchData = null;
           }

        };

        //serach grid data
        tgTableInputFilterSelf.searchGridData = function(){
           var searchArgs =  tgTableInputFilterSelf.searchData;
           removeCloseIconIfEmpty(searchArgs);
           tgTableHeaderController.broadcastEvent('tgDataGridSearch',searchArgs);
        };


        //get headerController
        tgTableInputFilterSelf.initHeaderController = function(headerController){
            tgTableHeaderController = headerController;
        };


        //clear search text
        tgTableInputFilterSelf.clearSearchData = function(){
          tgTableInputFilterSelf.searchData = '';
          tgTableInputFilterSelf.searchGridData();
        };

      };

      //link tgTableInputFilterLink

      var tgTableInputFilterLink = function(scope,element,attrs,controllers){

        var tgTableInputFilterController = controllers[0];
        var tgTableHeaderController = controllers[1];

        tgTableInputFilterController.initHeaderController(tgTableHeaderController);



      };

      return{
        restrict:'E',
        replace:true,
        priority:10001,
        require:['tgTableInputFilter','^tgTableHeader'],
        link:tgTableInputFilterLink,
        controller:['$scope',tgTableInputFilterController],
        controllerAs:'tgTableInputFilter',
        templateUrl:'/views/templates/tgTableInputFilter.html'

      };

    }

})();

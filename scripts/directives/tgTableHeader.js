(function() {
  'use strict';

  // @directive:tgTableHeader(tg-table-header)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:used by tgTableGrid directive to create its header with the data

  angular.module('tableGrid')
    .directive('tgTableHeader', tgTableHeader);

  //inject dependencies

  tgTableHeader.$inject = [];


  //@constructor:tgTableHeader

  function tgTableHeader() {

    //controller:tgTableHeaderController
    var tgTableHeaderController = function($scope) {
      var tgTableHeaderSelf = this;
      tgTableHeaderSelf.headers = null;


      //by default its ascending
      tgTableHeaderSelf.sortConfigDetails = {};
       tgTableHeaderSelf.searchConfigDetails = {};

      //create sortConfigobject used for sorting
      tgTableHeaderSelf.sortConfig = function(headers) {
        headers.map(function(item, key) {
          tgTableHeaderSelf.sortConfigDetails[item] = true;
        });
      };

      tgTableHeaderSelf.searchConfig = function(headers){
         headers.map(function(item,key){
             tgTableHeaderSelf.searchConfigDetails[item] = true;
         });
      };

      //sorting grid data on click of arrow down/up sort
      tgTableHeaderSelf.sortGridData = function(header,isSort) {

        var sortArgs = {'sortByParamter':header,'isSort':isSort};
        //toggle up/down arrows
        tgTableHeaderSelf.sortConfigDetails[header] = !tgTableHeaderSelf.sortConfigDetails[header];
        tgTableHeaderSelf.broadcastEvent('tgDataGridSort',sortArgs);

      };

      //serach grid data
      // tgTableHeaderSelf.searchGridData = function(){
      //   var searchArgs = tgTableHeaderSelf.searchData;
      //   tgTableHeaderSelf.broadcastEvent('tgDataGridSearch',searchArgs);
      //
      // };

      //common broadcast event
      tgTableHeaderSelf.broadcastEvent = function(event,sortArgs){
        $scope.$broadcast(event,sortArgs);
      };

      //set table data headers
      tgTableHeaderSelf.setHeaders = function(tableConfig) {
        tgTableHeaderSelf.headers = tableConfig.tableHeaders;
        //create sort config
        tgTableHeaderSelf.sortConfig(tgTableHeaderSelf.headers);
        tgTableHeaderSelf.searchConfig(tgTableHeaderSelf.headers);
      };

      tgTableHeaderSelf.getHeaders = function(){
        return tgTableHeaderSelf.headers;
      };

    };

    //compile fn

    var tgTableHeaderCompile = function(tElement, tAttrs) {
      return tgTableHeaderLink;
    };

    //link:tgTableHeaderLink

    var tgTableHeaderLink = function(scope, element, attrs, controllers,
      transcludeFn) {

      var tgTableGridController = controllers[0],
        tgTableHeaderController = controllers[1];

      tgTableHeaderController.setHeaders(tgTableGridController.getOptions());

    };

    return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      require: ['^tgTableGrid', 'tgTableHeader'],
      compile: tgTableHeaderCompile,
      controller: ['$scope',tgTableHeaderController],
      controllerAs: 'tgTableHeader',
      templateUrl: '/views/templates/tgTableHeader.html'
    };

  }



})();

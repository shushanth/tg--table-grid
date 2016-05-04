


(function(){

  'use strict';

  // @directive:tgTableHeader(tg-table-header)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:used by tgTableGrid directive to create its header with the data

  angular.module('tableGrid')
         .directive('tgTranscludeClass',tgTranscludeClass);


    //inject dependencies
    tgTranscludeClass.$inject = [];

    //constructor:tgTranscludeClass

    function tgTranscludeClass(){

      var tgTranscludeClassCompile = function(tElement,tAttrs){

        var tElementNext = tElement.children();
        var tElementScope = tElement.scope();

        var count = parseInt(12/tElementScope.tgTableGrid.options.tableHeaders.length);

        (tElementNext.length) ? tElementNext.addClass('col-sm-'+count):tElement.addClass('col-sm-'+count);

        tElement.on('$destroy',function(){
          tElementScope.$destroy();
        });

      };

      return{
        restrict:'A',
        priority:'1001',
        compile:tgTranscludeClassCompile
      };
    }



})();

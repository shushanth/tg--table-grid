(function(){

  'use strict';

  // @directive:tgTableCellSelect(tg-table-cell-select)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:on click of the cell it activates the backgound color


    angular.module('tableGrid')
           .directive('tgTableCellSelect',tgTableCellSelect);

      //inject dependencies

      tgTableCellSelect.$inject =["$timeout"];

      //constructor:tgTableCellSelect

      function tgTableCellSelect($timeout){


        //controller:tgTableCellSelectController

        var tgTableCellSelectController = function(){
          var tgTableCellSelectSelf = this;
          var tgTableSingleSelect = null;
          var tgTableToggleSelect = null;


        tgTableCellSelectSelf.handleToggleCellSelection = function(element){
            if(tgTableSingleSelect){
              element.parent().find('.cell-select-default').not(element).removeClass('cell-select-default');
            }
              element.toggleClass('cell-select-default');
          };

          tgTableCellSelectSelf.unhandleToggleCellSelection = function(element){
            if(tgTableSingleSelect){
              element.parent().find('.cell-select-default').removeClass('cell-select-default');
            }
            element.addClass('cell-select-default');
          };


          tgTableCellSelectSelf.changeColor = function(){
            var element = angular.isArray(this) ? element : angular.element(this);
              if(tgTableToggleSelect){
                    tgTableCellSelectSelf.handleToggleCellSelection(element);
              }
              else{
                tgTableCellSelectSelf.unhandleToggleCellSelection(element);
              }
          };


         tgTableCellSelectSelf.initCellSelection = function(singleSelect,toggleSelection){
             tgTableSingleSelect = singleSelect;
             tgTableToggleSelect = toggleSelection;
         };

        };


        //link:tgTableCellSelectLink

        var tgTableCellSelectLink = function(scope,element,attrs,controller){

          var tgTableBodyController = controller[0];
          var tgTableCellSelectController = controller[1];
          var tgTableToggleSelectCounter = 0;

          tgTableCellSelectController.initCellSelection(tgTableBodyController.singleSelect,tgTableBodyController.toggleSelect);

          //cell selection
          var executeCellSelection = function(){
                element.addClass('cursor-pointer');
                element.on('click',tgTableCellSelectController.changeColor);
          };

          //remove cell selection : if the cell selection enable is false
          var stopCellSelection = function(){
            element.off('click',tgTableCellSelectController.changeColor);
          };

         var cellSelection = (!tgTableBodyController.cellSelection)? stopCellSelection : executeCellSelection;

         //cellSelection exexution
         cellSelection();

          //destroy
          scope.$on('destroy',function(){
            element.off('click',tgTableCellSelectController.changeColor);
          });

        };

          return{
            restrict:'EA',
            require:['^tgTableBody','tgTableCellSelect'],
            link:tgTableCellSelectLink,
            controller:tgTableCellSelectController

          };
      }

})();

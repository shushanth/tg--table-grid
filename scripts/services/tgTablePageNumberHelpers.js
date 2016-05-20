(function(){

  'use strict';

  //@factory:tgTablePageNumberHelpers.js
  // @module:tableGrid
  //@inject : tgTableGridHelpers;
  // @description:pageination page number helpers

   angular.module('tableGrid')
          .factory('tgTablePageNumberHelpers',tgTablePageNumberHelpers);


  //inject dependencies
  tgTablePageNumberHelpers.$inject = ['tgTableGridHelpers','$timeout'];


  //constructor:tgTablePageNumberHelpers

   function tgTablePageNumberHelpers(tgTableGridHelpers,$timeout){



     var _unActivateRestPageButtons = function(){

        var _pageButtons = angular.element('.page-buttons');
       tgTableGridHelpers.removeAddClassConfig.removeClass.call(_pageButtons,'page-button-activate');
     };

     var _activeCurrentIntialized = function(index){

       var curentIndex = index-1;
       angular.element('.page-buttons').eq(curentIndex).addClass('page-button-activate');
     };

     var _removedActivatedClass = function(index2Remove){
       var index =index2Remove;
       var element = angular.element('.page-buttons').eq(index);
       
        tgTableGridHelpers.removeAddClassConfig.removeClass.call(element,'page-button-activate');



     };

     var  _activatePageButton = function(elementIndex){
        _unActivateRestPageButtons();
        _activeCurrentIntialized(elementIndex);


     };


      return{
        activatePageButton:_activatePageButton,
        removeActivatedClass:_removedActivatedClass
      };
   }


})();

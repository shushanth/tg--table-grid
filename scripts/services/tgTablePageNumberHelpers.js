(function(){

  'use strict';

  //@factory:tgTablePageNumberHelpers.js
  // @module:tableGrid
  //@inject : tgTableGridHelpers;
  // @description:pageination page number helpers

   angular.module('tableGrid')
          .factory('tgTablePageNumberHelpers',tgTablePageNumberHelpers);


  //inject dependencies
  tgTablePageNumberHelpers.$inject = ['tgTableGridHelpers'];


  //constructor:tgTablePageNumberHelpers

   function tgTablePageNumberHelpers(tgTableGridHelpers){



     var _unActivateRestPageButtons = function(){
       var _pageButtons = angular.element('.page-buttons');
       //_pageButtons.removeClass('page-button-activate');
       tgTableGridHelpers.removeAddClassConfig.removeClass.call(_pageButtons,'page-button-activate');
     };

     var _activeCurrentIntialized = function(index){
       var curentIndex = index-1;
       angular.element('.page-buttons').eq(curentIndex).addClass('page-button-activate');
     };

     var  _activatePageButton = function(elementIndex){
        _unActivateRestPageButtons();
        _activeCurrentIntialized(elementIndex);


     };


      return{
        activatePageButton:_activatePageButton
      };
   }


})();

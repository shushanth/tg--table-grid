(function(){
  'use strict';


  //@factory:tgTableGridHelpers
  // @module:tableGrid
  //
  // @description:array helpers service


  angular.module('tableGrid')
         .factory('tgTableGridHelpers',tgTableGridHelpers);

    //inject dependencies

    tgTableGridHelpers.$inject = [];

    //constructor:tgTableGridHelpers

    function tgTableGridHelpers(){

        //check if the number has decimals in it
        var _checkIfNumberHasDecimals = function(number){
           return (number && (number%1!==0));
        };
        //makes an array [1,2,3,...] in ascending till array length
        var _getAscendingNumberArray = function(arrayLength){
            return Array.apply(null,{length:arrayLength}).map(function(item,index){
               return index+1;
            });
        };

        return{
          checkIfNumberHasDecimals:_checkIfNumberHasDecimals,
          getAscendingNumberArray : _getAscendingNumberArray
        };
    }

})();

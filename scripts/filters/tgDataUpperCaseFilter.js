(function(){
  'use strict';

  // @filter:tgDataUpperCase
  // @module:tableGrid
  //@description:filter to make content first letter to upperCase

  angular.module('tableGrid')

        .filter('tgDataUpperCase',tgDataUpperCase);

  function tgDataUpperCase(){
    return function(value){
      return value.slice(0,1).toUpperCase()+value.slice(1);
    }
  }

})();

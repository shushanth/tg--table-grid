(function(){

  // @directive:tgTableTitle(tg-table-title)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:provides the title options for the table

  'use strict';

  angular.module('tableGrid')
         .directive('tgTableTitle',tgTableTitle);


    //inject dependencies

    tgTableTitle.$inject = [];

    //@constructor :tgTableTitle

    function tgTableTitle(){


      //tgTableTitleController

      var tgTableTitleController = function(){

        var tgTableTitleSelf = this;

        tgTableTitleSelf.title = null;

        tgTableTitleSelf.setTitle = function(tableConfig){
          tgTableTitleSelf.title = tableConfig.title;
        };


      };

      //tgTableTitleLink

      var tgTableTitleLink = function(scope,element,attrs,controllers,transcludeFn){

        var tgTableGridController = controllers[0],
            tgTableTitleController = controllers[1];

          tgTableTitleController.setTitle(tgTableGridController.getOptions());
      };


      return{
        restrict:'E',
        link:tgTableTitleLink,
        controller:tgTableTitleController,
        controllerAs:'tgTableTitle',
        require:['^tgTableGrid','tgTableTitle'],
        template:`
          <section ng-if="tgTableTitle.title">
            <p class="lead text-capitalize">{{tgTableTitle.title}}</p>
          </section>

        `
      };
}




})();

(function(){

  // @directive:tgTableFooterDetails(tg-table-footer-details)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:main footer directive which has sub directives

     angular.module('tableGrid')
            .directive('tgTableFooter',tgTableFooter);


      tgTableFooter.$inject = [];

      function tgTableFooter(){

        //controller:tgTableFooterController
        var tgTableFooterController = function(){


            var tgTableFooterControllerSelf = this;

            tgTableFooterControllerSelf.tgTablePageSize = null ;
            tgTableFooterControllerSelf.gridDataCount = null;
            tgTableFooterControllerSelf.showPagination = null;

            //set number of data items to display in footer

            tgTableFooterControllerSelf.paginationConfig = function(tableConfig){

              var dataCount = tableConfig.data.length;
                  tgTableFooterControllerSelf.gridDataCount = dataCount;

                  if(tableConfig.pagination[0]){
                    tgTableFooterControllerSelf.showPagination = tableConfig.pagination[0];
                    tgTableFooterControllerSelf.setPageSize(tableConfig.pagination[1]);
                  }


            };

            //set the page for the pagination

            tgTableFooterControllerSelf.setPageSize = function(pageSizes){
              tgTableFooterControllerSelf.tablePageSizes = pageSizes;

            };

            //get data items count

            tgTableFooterControllerSelf.getItemsCount = function(){
                return tgTableFooterControllerSelf.gridDataCount;
            };

            tgTableFooterControllerSelf.getPageSize = function(){
              return tgTableFooterControllerSelf.tablePageSizes;
            };

            

        };


        //link:tgTableFooterLink
        var tgTableFooterLink = function(scope,element,attrs,controllers){

          var tgTableGridController = controllers[0],
            tgTableFooterController = controllers[1];

          tgTableFooterController.paginationConfig(tgTableGridController.getOptions());


        };



          return{
            restrict:'E',
            require: ['^tgTableGrid', 'tgTableFooter'],
            link:tgTableFooterLink,
            controller:tgTableFooterController,
            controllerAs:'tgTableFooter',
            templateUrl:'/views/templates/tgTableFooter.html'
          };
      }


})();

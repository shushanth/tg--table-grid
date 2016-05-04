

  // @directive:tgTableBody(tg-table-body)
  // @module:tableGrid
  // @used:'E'(element)
  // @description:used by tgTableGrid directive to create its body with the data


(function(){

  'use strict';


  angular.module('tableGrid')
         .directive('tableDataRepeater',tableDataRepeater);

  //inject dependencies
  tableDataRepeater.$inject = [];


  //@constructor:tableDataRepeater

   function tableDataRepeater(){

     var tableDataRepeaterLink = function(scope,element,attrs,ctrl,transcludeFn){
       
       var datas = scope.$eval(attrs.tableDataRepeater);
       var removeCurrentItems = scope.$eval(attrs.removeCurrentItems);
       var datasKeysLength = angular.isObject(datas) ? Object.keys(datas).length : datas;

       if(removeCurrentItems && element.parent().length){
            element.parent().children().remove();
       }



       for(var i = 0 ,len = datasKeysLength;i<len;i++){

         var innerScope = scope.$new();
         var mainElement = element;
         innerScope.content = datas[Object.keys(datas)[i]] || i+1;
         transcludeFn(innerScope,function(clone){
           element.parent().append(clone);
           });
       }


       element.on('$destroy',function(){
         innerScope.$destroy();
       });



     };

      return{
        restrict:'EA',
        transclude:'element',
        link:tableDataRepeaterLink
      };
   }

})();

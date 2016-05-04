(function(){



'use strict';


angular.module('tableGrid')
	   .directive('tgTableGrid',tgTableGrid);


//inject dependencies

tgTableGrid.$inject = ["$compile"];


//@constructor tgTableGrid

function tgTableGrid($compile){

	//controller :tgTableGridController

	var tgTableGridController = function($scope,$parse){
		var tgTableGridSelf = this;

		var tableHeaders = [];

		tgTableGridSelf.options = null;


		//table header construction
		tgTableGridSelf.constructTableHeaders = function(options){
				var firstData = options.data[0];
				tgTableGridSelf.options.tableHeaders = Object.keys(firstData);
		};



		//settting the table headers and its data
		tgTableGridSelf.setOptions = function(options){
			 options = $parse(options)(tgTableGridSelf);
			tgTableGridSelf.options = options;

    

			//if headers are not mentioned in the options object
			if(!tgTableGridSelf.options.tableHeaders){
				tgTableGridSelf.constructTableHeaders(options);
			}




		};

		//return the options  : header and data
		tgTableGridSelf.getOptions = function(){
			return tgTableGridSelf.options;
		};
	};

	var tgTableGridLink = {
			pre: function(scope,element,attrs,tgTableGridController,transclude){
		 			tgTableGridController.setOptions(attrs.tgTableGrid);
			}
};

		return{
			restrict:'A',
			require : 'tgTableGrid',
			controller:['$scope','$parse',tgTableGridController],
			controllerAs:'tgTableGrid',
			link:tgTableGridLink,
			templateUrl:'/views/templates/tgTableGrid.html'

		};
}




})();

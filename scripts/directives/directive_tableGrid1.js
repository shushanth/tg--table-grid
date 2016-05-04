

// // directives.js
// @directive:tgMain (tg-main);
// @module:tableGrid;
// @scope:isolate;
// @view:element(E)
//@description : main table which fetches the data from the url provided

'use strict';

angular.module('tableGrid')
      .directive('tgMain',tgMain);

//inject dependencies
tgMain.$inject =["$http","$q"];

function tgMain(){

	//_tgMainController : controller which handles the Url 
	var _tgMainController = function($csope,$http,$q){

		var tgSelf = this;

		var data2Fetch = $http.get('test.json');

		data2Fetch.then(function(datas){
			tgSelf.data = datas;
		},function error(err){
			console.log('err-->'+err);
		});


		tgSelf.getTableData = function(){
			return tgSelf.data;
		}


	}

	return{
		restrict:'E',
		scope:{},
		controller:["$scope","$http","$q",_tgMainController]
		
	}
};


// // directives.js
// @directive:tgHeader(tg-header);
// @module:tableGrid;
// @scope:isolate;
// @view:element(E)
//@description : 

angular.module('tableGrid')
       .directive('tgHeader',tgHeader);

//inject dependencies
tgHeader.$inject = [];

//@constructor Fn:tgHeader
function tgHeader(){

	//tgHeader controller
	var _tgHeaderController = function($scope){



	}


	////tgHeader link
	var _tgHeaderLink = function(scope,element,attrs,controllers){
		var tgHeaderController = controllers[0],
		    tgMainController   = controllers[1];




	}

	return{

		restrict:'E',
		scope:{},
		require:['tgHeader','^tgMain'],
		link:_tgHeaderLink,
		controller:["$scope",_tgHeaderController]
	}
}









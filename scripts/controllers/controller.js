(function(){



'use strict';


angular.module('tableGrid')
  .controller('tgController', tgController);


//inject dependencies

tgController.$inject = ["$scope"];


//@constructor:tgController;

function tgController($scope) {


  $scope.title = "table grid";

  $scope.data1 = [{
  "index": 1,
  "index_start_at": 56,
  "integer": 38,
  "float": 12.6037,
  "name": "Neal",
  "surname": "Boykin",
  "fullname": "Heidi Morgan",
  "email": "marlene@hoyle.et",
  "bool": true
  },
  {
  "index": 2,
  "index_start_at": 57,
  "integer": 22,
  "float": 12.2735,
  "name": "Melinda",
  "surname": "Waters",
  "fullname": "Robert Callahan",
  "email": "lee@holden.br",
  "bool": false
  },
  {
  "index": 3,
  "index_start_at": 58,
  "integer": 8,
  "float": 16.9919,
  "name": "Warren",
  "surname": "Coley",
  "fullname": "Teresa Lamb",
  "email": "jeanette@lassiter.fi",
  "bool": true
  },
  {
  "index": 4,
  "index_start_at": 59,
  "integer": 23,
  "float": 13.5694,
  "name": "Juan",
  "surname": "Banks",
  "fullname": "Paige McKee",
  "email": "stephen@frederick.sa",
  "bool": true
  },
  {
  "index": 5,
  "index_start_at": 60,
  "integer": 18,
  "float": 11.9967,
  "name": "Theresa",
  "surname": "Snow",
  "fullname": "Frances Kent",
  "email": "priscilla@morris.pw",
  "bool": false
  },
  {
  "index": 6,
  "index_start_at": 61,
  "integer": 48,
  "float": 15.9556,
  "name": "Eugene",
  "surname": "Montgomery",
  "fullname": "Sidney Jennings",
  "email": "dwight@weiss.im",
  "bool": false
  },
  {
  "index": 7,
  "index_start_at": 62,
  "integer": 37,
  "float": 17.1693,
  "name": "Lois",
  "surname": "Bowden",
  "fullname": "Annie Glass",
  "email": "kim@levine.mu",
  "bool": false
  },
  {
  "index": 8,
  "index_start_at": 63,
  "integer": 0,
  "float": 18.8198,
  "name": "Holly",
  "surname": "Richards",
  "fullname": "Oscar Diaz",
  "email": "melissa@butler.gr",
  "bool": true
  },
  {
  "index": 9,
  "index_start_at": 64,
  "integer": 39,
  "float": 19.2505,
  "name": "Harold",
  "surname": "Yates",
  "fullname": "Katie Robinson",
  "email": "randall@holland.ss",
  "bool": true
  },
  {
  "index": 10,
  "index_start_at": 65,
  "integer": 28,
  "float": 11.0344,
  "name": "Don",
  "surname": "Quinn",
  "fullname": "Donna Bray",
  "email": "stephanie@clarke.pa",
  "bool": true

}];


  $scope.data = [{
    'name': 'john',
    'age': 18,
    'occupation': 'driver',
    'city': 'Bangalore',
    'gender': 'Male',
    'phone': '123-231-333'
  }, {
    'name': 'paul',
    'age': 28,
    'occupation': 'lawyer',
    'city': 'Chennai',
    'gender': 'Male',
    'phone': '123-231-333'
  },{
    'name': 'Armin',
    'age': 30,
    'occupation': 'Bouncer',
    'city': 'Pune',
    'gender': 'Male',
    'phone': '4513-231-333'
  },
  {
    'name': 'zeal',
    'age': 21,
    'occupation': 'carpentar',
    'city': 'mumbai',
    'gender': 'Female',
    'phone': '123-231-333'
  }, {
    'name': 'kool',
    'age': 81,
    'occupation': 'plumber',
    'city': 'delhi',
    'gender': 'Male',
    'phone': '123-231-333'
  }, {
    'name': 'zalo',
    'age': 50,
    'occupation': 'cook',
    'city': 'kolkatta',
    'gender': 'Female',
    'phone': '123-231-333'
  }, {
    'name': 'lago',
    'age': 19,
    'occupation': 'builder',
    'city': 'agra',
    'gender': 'Female',
    'phone': '123-231-333'
  },
  {
    'name': 'lago',
    'age': 19,
    'occupation': 'builder',
    'city': 'agra',
    'gender': 'Female',
    'phone': '123-231-333'
  },
  {
    'name': 'Brain',
    'age': 40,
    'occupation': 'teacher',
    'city': 'WB',
    'gender': 'Female',
    'phone': '123-231-333'
  },
  {
    'name': 'Kat',
    'age': 19,
    'occupation': 'farmer',
    'city': 'ES',
    'gender': 'Male',
    'phone': '123-000-333'
  },
  {
    'name': 'zella',
    'age': 22,
    'occupation': 'banker',
    'city': 'HP',
    'gender': 'Female',
    'phone': '634-231-2309'
  },
  {
    'name': 'zayp',
    'age': 27,
    'occupation': 'trainer',
    'city': 'OT',
    'gender': 'male',
    'phone': '0123-892-456'
  },  {
      'name': 'zayp',
      'age': 27,
      'occupation': 'trainer',
      'city': 'OT',
      'gender': 'male',
      'phone': '0123-892-456'
    },  {
        'name': 'zayp',
        'age': 27,
        'occupation': 'trainer',
        'city': 'OT',
        'gender': 'male',
        'phone': '0123-892-456'
      },  {
          'name': 'zayp',
          'age': 27,
          'occupation': 'trainer',
          'city': 'OT',
          'gender': 'male',
          'phone': '0123-892-456'
        },{
            'name': 'zayp',
            'age': 27,
            'occupation': 'trainer',
            'city': 'OT',
            'gender': 'male',
            'phone': '0123-892-456'
          }];

  for(var i = 0 ; i < 400 ; i++){
    $scope.data.push($scope.data[0]);
  }

  $scope.config = {
    // 'tableHeaders':['name','age','occupation','city','gender','phone'],
    'title': $scope.title,
    'data': $scope.data,
    'cellSelection':[true,true,true],//enable,singleSelect,toggleSelect
    'pagination':[true,[5,3,15,53,56,75]],//enable ,[selected page]


  };

}
})();

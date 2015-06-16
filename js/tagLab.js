angular.module('tagLab', ['ngRoute','ngColorThief', 'uiGmapgoogle-maps'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'js/tagLab.html'
  })
  .when('/game/', {
    templateUrl: 'js/tagGame.html'
  })
  .when('/food/', {
    templateUrl: 'js/tagFood.html'
  })
  .when('/loc/', {
    templateUrl: 'js/tagLoc.html'
  })
  .when('/clock/', {
    templateUrl: 'js/tagClock.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.controller('ctrlGame', function($scope, servGame){
  $scope.imgs = [];
  $scope.test = function (tag) {
    servGame.getRecent(tag).then(function(res){
      $scope.imgs = res;
    });
  };
  $scope.test('icecream');
})

.service('servGame', function($q, $http){
  this.getRecent = function(tag){
    var def = $q.defer();
    var endPoint = 'https://api.instagram.com/v1/tags/' + tag + 
                   '/media/recent?client_id=986eb7577449427da9961ae44427cf57&callback=JSON_CALLBACK' +
                   '&count=100';
    $http({
      method: 'JSONP',
      url: endPoint
    })
    .then(function(res){
      var parsed = res.data.data;
      def.resolve(parsed);
    });
    return def.promise;
  }
})

.controller('ctrlFood', function($scope, servFood){
  $scope.tweets = [];
  $scope.test = function (tag) {
    servFood.getRecent(tag).then(function(res){
      $scope.imgs = res;
    });
  };
  $scope.test('icecream');
})

.service('servFood', function($q, $http){
  this.getRecent = function(tag){
    var def = $q.defer();
    var endPoint = 'https://stream.twitter.com/1.1/statuses/filter.json?&track=' + tag;
    $http({
      method: 'JSONP',
      url: endPoint
    })
    .then(function(res){
      var parsed = res;
      console.log(parsed);
      def.resolve(parsed);
    });
    return def.promise;
  }
})

.controller('ctrlLoc', function($scope, uiGmapGoogleMapApi, servLoc){
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []
    $scope.markers = [];
    $scope.imgs = [];
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = { center: { latitude: 40.2329323, longitude: -111.6481862 }, zoom: 12 };
      $scope.$watch('map.center.latitude', function(){
        $scope.getImgs($scope.map.center.latitude, $scope.map.center.longitude);
      });
    });
    $scope.getImgs = function(lat, lng){
      servLoc.getRecent(lat, lng).then(function(res){
        $scope.imgs = res;
      });
    };
})

.service('servLoc', function($q, $http){
  this.getRecent = function(lat, lng){
    var def = $q.defer();
    var endPoint = 'https://api.instagram.com/v1/media/search?' +  
                   'lat=' + lat + '&lng=' + lng +
                   '&client_id=986eb7577449427da9961ae44427cf57&callback=JSON_CALLBACK';
    $http({
      method: 'JSONP',
      url: endPoint
    })
    .then(function(res){
      var parsed = res.data.data;
      def.resolve(parsed);
    });
    return def.promise;
  }
})

.controller('ctrlClock', function($scope, servClock){
  $scope.tweets = [];
  $scope.test = function (tag) {
    servClock.getRecent(tag).then(function(res){
      $scope.imgs = res;
    });
  };
  $scope.test('icecream');
})

.service('servClock', function($q, $http){
  this.getRecent = function(tag){
    var def = $q.defer();
    var endPoint = 'https://stream.twitter.com/1.1/statuses/filter.json?&track=' + tag;
    $http({
      method: 'JSONP',
      url: endPoint
    })
    .then(function(res){
      var parsed = res;
      console.log(parsed);
      def.resolve(parsed);
    });
    return def.promise;
  }
})
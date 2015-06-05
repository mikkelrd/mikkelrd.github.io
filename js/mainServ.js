var ng = angular.module('mainApp').service('mainServ', function($q, $http){
  this.getRecent = function(){
    console.log('test2');
    var def = $q.defer();
    var endPoint = 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=986eb7577449427da9961ae44427cf57'
    $http({
      method: 'GET',
      url: endPoint,
      crossDomain: true
      //url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=986eb7577449427da9961ae44427cf57'
      //url: 'https://api.instagram.com/v1/media/popular?client_id=986eb7577449427da9961ae44427cf57&callback=cbJsonp'
      //url: 'http://iconosquare.com/tag/nofilter'
    })
    .then(function(res){
      console.log(res);
      //def.resolve(parsed);
    });
    return def.promise;
  }
});
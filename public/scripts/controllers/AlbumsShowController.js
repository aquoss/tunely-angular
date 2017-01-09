angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong = function(newSong){
    $http({
      method: 'POST',
      url: '/api/albums/'+$routeParams.id+'/songs',
      data: newSong
    }).then(function successCallback(res){
      vm.album.songs.push(res.data);
    }, function errorCallback(res){
      console.log('There was an error posting the data', res);
    });
  }

  vm.editSong = function(song){
    $http({
      method: 'PUT',
      url: '/api/albums/'+$routeParams.id+'/songs/'+song._id,
      data: song
    }).then(function successCallback(updatedSong){
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1, updatedSong.data);
    })
  }

  vm.deleteSong = function(song){
    $http({
      method: 'DELETE',
      url: '/api/albums/'+$routeParams.id+'/songs/'+song._id
    }).then(function successCallback(song){
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1);
    })
  }

}

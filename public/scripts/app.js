/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.

AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ( $http ) {
  var vm = this;
  vm.newAlbum = {};

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(handleSuccess, handleError);

  function handleSuccess(res){
    vm.albums = res.data;
  }
  function handleError(res){
    console.log('error', res);
  }

  vm.createAlbum = function(){
    $http({
      method: 'POST',
      url: '/api/albums',
      data: {
        name: vm.newAlbum.name,
        artistName: vm.newAlbum.artistName,
        genres: vm.newAlbum.genres.split(',')
      }
    }).then(handlePostSuccess, handleError);

    function handlePostSuccess(res){
      vm.albums.push(res.data);
    }
  }
}

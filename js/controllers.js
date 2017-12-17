var hypeControllers = angular.module('hypeControllers', []);

hypeControllers.controller('HomeController', [, function() {

}]);

hypeControllers.controller('MusicController', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {

    $http.get('js/discography.json').then(function(result) {

        $scope.releases = result.data;

        if ($routeParams.release) {
          $scope.release = $.grep($scope.releases, function(e) {
            return e.url == $routeParams.release;
          })[0];
        } else if ($routeParams.id) {
          $scope.release = $.grep($scope.releases, function(e) {
            return e.id == $routeParams.id;
          })[0];
        } else {
          $scope.about = true;
        }

        $.each($scope.releases, function(i, release) {

          if (release.parent) {
            release.parent = $.grep($scope.releases, function(e) {
              return e.id == release.parent;
            })[0];
            release.sort = release.parent.date + "_" + release.date;
          } else {
            release.sort = release.date + "_" + release.date;
          }

          if (release.player_site === 'BC') {
            release.player_src = $sce.trustAsResourceUrl("//bandcamp.com/EmbeddedPlayer/album=" + release.player_id + "/size=large/tracklist=false/artwork=none/");
            release.player_url = "http://purehype.bandcamp.com/album/" + release.url;
          } else if (release.player_site === 'SC') {
            release.player_src = $sce.trustAsResourceUrl("//w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + release.player_id + "&show_artwork=true");
          }

        });

    }, function(error) {

    });

    $scope.releaseFamily = function(item) {
      return item.parent === $scope.release;
    }

    $scope.mainDiscography = function(item) {
      return typeof(item.parent) === 'undefined' || item.deleted !== true;
    }

}]);

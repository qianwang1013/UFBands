'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
                $scope.authentication = Authentication;

		$scope.currentFlag = 'false';
		$scope.alumniFlag = 'false';
		$scope.prospectiveFlag = 'false';

                $scope.instruments = ['piccolo', 'flute', 'clarinet', 'oboe', 'english horn', 'basson', 'contrabass',
		'contrabass bassoon', 'alto saxophone', 'tenor saxophone','baritone saxophone', 
		'french horn', 'horn', 'mellophone','trumpet', 'cornet', 'baritone', 'euphonium', 'trombone',
		'bass trombone', 'tuba', 'sousaphone', 'string bass', 'bass', 'bass guitar', 'guitar',
		'percussion', 'bass drum', 'quads', 'tenors', 'snare', 'cymbals', 'triangle', 'timpani', 
		'marimba', 'vibraphone', 'xylophone', 'glockenspiel', 'drumset', 
		'celeste', 'celesta', 'piano', 'harp', 'bongos'];
                $scope.instruments.sort();
                
		// If user is signed in then redirect back home
		if ($scope.authentication.user) {
                    if($scope.currentFlag==='true')
                       $location.path('/home/current');
                    else if($scope.prospectiveFlag==='true')
                        $location.path('/home/prospective');
                    else if($scope.alumniFlag==='true')
                        $location.path('/home/alumni');
                    else
                        $location.path('/home');           
                }

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
                                if($scope.currentFlag==='true')
                                    $location.path('/home/current');
                                else if($scope.prospectiveFlag==='true')
                                    $location.path('/home/prospective');
                                else if($scope.alumniFlag==='true')
                                    $location.path('/home/alumni');
                                else
                                    $location.path('/home');
                                
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
                                $scope.user = Authentication.user;
				// And redirect to the index page
                                if($scope.user.userType==='Current')
                                    $location.path('/home/current');
                                else if($scope.user.userType==='Prospective')
                                    $location.path('/home/prospective');
                                else if($scope.user.userType==='Alumni')
                                    $location.path('/home/alumni');
                                else
                                    $location.path('/home');
                                
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

            $scope.currentUser = function() {
	        $scope.currentFlag = 'true';
	        $scope.alumniFlag = 'false';
	        $scope.prospectiveFlag = 'false';
	    };

	    $scope.prospectiveUser = function() {
	        $scope.currentFlag = 'false';
	        $scope.alumniFlag = 'false';
	        $scope.prospectiveFlag = 'true';
	    };		
	
		$scope.alumniUser = function() {
	        $scope.currentFlag = 'false';
	        $scope.alumniFlag = 'true';
	        $scope.prospectiveFlag = 'false';
	    };	
	}
]);

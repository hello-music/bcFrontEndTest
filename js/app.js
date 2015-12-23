angular.module('app', ['components'])

    .controller('BeerCounter', function($scope, $locale) {
        $scope.beers = [0, 1, 2, 3, 4, 5, 6];
        if ($locale.id == 'en-us') {
            $scope.beerForms = {
                0: 'no beers',
                one: '{} beer',
                other: '{} beers'
            };
        } else {
            $scope.beerForms = {
                0: 'žiadne pivo',
                one: '{} pivo',
                few: '{} pivá',
                other: '{} pív'
            };
        }
    })

    .controller('testCtrl', function($scope) {
        $scope.bcTitle = 'El Pooch';
        $scope.bcNotes = 'Alex Nelson';
    })

    .controller('welcomeCtrl', function($scope) {
        $scope.showWelcome = true;
        $scope.hideWelcome = function(){
            $scope.showWelcome = false;
        }
        $scope.showForm = function(){
            console.log('show form');
        }
    })

;
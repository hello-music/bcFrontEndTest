angular.module('app', ['components'])

    .controller('BeerCounter', function ($scope, $locale) {
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


    .controller('testCtrl', function ($scope, Books) {
        $scope.bcTitle = 'El Pooch';
        $scope.bcNotes = 'Alex Nelson';
        $scope.starValue = null;

        $scope.books = [];

        Books.getData().then(function (response) {

            console.log('books: ', response.data);

            $scope.books = response.data;
        });

        $scope.$watch(
            // This function returns the value being watched. It is called for each turn of the $digest loop
            function () {
                return $scope.starValue;
            },
            // This is the change listener, called when the value returned from the above function changes
            function (newValue, oldValue) {
                console.log('watch called');
                if (newValue !== oldValue) {
                    // Only increment the counter if the value changed
                    //$scope.noWord = newValue.length >= 1 ? newValue.replace(/\s+/g, '') < 1 : true;

                    console.log('new value?', $scope.starValue);
                }
            }
        );
    })

    .controller('booksCtrl', function ($scope, Books) {
        $scope.bcTitle = 'El Pooch';
        $scope.bcNotes = 'Alex Nelson';

        Books.getData().then(function (response) {

            console.log('books: ', response.data);

            $scope.books = response.data;
        });
    })

    .controller('welcomeCtrl', function ($scope) {
        $scope.showWelcome = true;
        $scope.showDialog = false;

        $scope.hideWelcome = function () {
            $scope.showWelcome = false;
        }
        $scope.showForm = function () {
            $scope.showDialog = true;
        }
    })

;
angular.module('app.services', [])

    .factory('Books', function ($http) {
        var Books = {};
        //Gets the list of nuclear weapons
        Books.getData = function () {
            return $http.get('./books.json');
        };

        return Books;
    })

    .factory('FooterLabels', function ($http) {
        var FooterLabels = {};
        //Gets the list of nuclear weapons
        FooterLabels.getData = function () {
            return $http.get('./footerLabels.json');
        };

        return FooterLabels;
    });

angular.module('components', ['app.services'])

    //custom class needs to be added in a file loaded after style.css
    .directive('bcBigHeader', function () {

        return {
            restrict: 'E',
            scope: {
                customClass: '@'
            },
            transclude: true,
            template: '<div class="header big-header bright {{customClass}}" ng-transclude></div>'
        };
    })

    .directive('bcPanel', function () {

        return {
            restrict: 'E',
            scope: {
                bcType: '@'
            },
            transclude: true,
            template: '<div class="bc-panel {{bcType}} background-clean" ng-transclude></div>'
        };
    })
    .directive('bcFooter', ['FooterLabels', function (FooterLabels) {

        return {
            restrict: 'E',
            scope: {
                bcType: '@',
                leftClick: '&onLeftClick',
                rightClick: '&onRightClick'
            },
            controller: function ($scope, $element) {
                var type = $scope.bcType;

                FooterLabels.getData().then(function(response){

                    var labels = response.data;

                    $scope.left = labels[type].left;
                    $scope.right = labels[type].right;
                });
            },
            template: '<div class="bc-footer">' +
            '<p class="left normal pointer" ng-click="leftClick()">{{left}}</p>' +
            '<p class="right primitive pointer" ng-click="rightClick()">{{right}}</p>' +
            '</div>'
        };
    }])

    .directive('bcLeftImage', function () {
        return {
            restrict: 'E',
            scope: {
                imageSrc: '@'
            },
            template: '<div class="bc-left-image">' +
            '<img src={{imageSrc}}>' +
            '</div>'
        };
    })

    .directive('bcRightContainer', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div class="bc-right-container" ng-transclude></div>'
        };
    })

    .directive('bcContent', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div class="bc-content" ng-transclude></div>'
        };
    })

    .directive('bcTitleNotes', function () {
        return {
            restrict: 'E',
            scope:{
                book:'='
            },
            template: '<div class="bc-title-notes">' +
            '<p>{{book.title}}</p>' +
            '<p>{{book.author}}</p>' +
            '</div>'
        };
    })

    .directive('bcDialog', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope:{
                show:'='
            },
            template: '<div class="bc-dialog" ng-show="show">' +
            '<div class="close pointer" ng-click="close()">&times;</div>' +
            '<div ng-transclude></div>' +
            '</div>',
            link: function($scope, element, attrs) {
                $scope.close = function(){
                    $scope.show = false;
                }
            }
        };
    })

    .directive('bcDialogContent', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div class="bc-dialog-content" ng-transclude></div>'
        };
    })

    .directive('bcRating', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<fieldset class="bc-rating">' +
            '<input type="radio" id="star5" name="rating" value="5" ng-model="starValue"/><label for="star5"></label>' +
            '<input type="radio" id="star4" name="rating" value="4" ng-model="starValue"/><label for="star4"></label>' +
            '<input type="radio" id="star3" name="rating" value="3" ng-model="starValue"/><label for="star3"></label>' +
            '<input type="radio" id="star2" name="rating" value="2" ng-model="starValue"/><label for="star2"></label>' +
            '<input type="radio" id="star1" name="rating" value="1" ng-model="starValue" /><label for="star1"></label>' +
            '</fieldset>',
            link: function($scope, element, attrs) {
                $scope.starValue = null;
                $scope.$watch(
                    function () {
                        return $scope.starValue;
                    },
                    function (newValue, oldValue) {
                        console.log('new watch called');
                        if (newValue !== oldValue) {

                            console.log('new value?', $scope.starValue);
                        }
                    }
                );
            }
        };
    })

    .directive('tabs', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope, $element) {
                var panes = $scope.panes = [];

                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                }

                this.addPane = function (pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                }
            },
            template: '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
        };
    })

    .directive('pane', function () {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: {title: '@'},
            link: function (scope, element, attrs, tabsController) {
                tabsController.addPane(scope);
            },
            template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
        };
    })
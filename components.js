angular.module('components', ['app.services'])

    .directive('bcPanel', function () {

        return {
            restrict: 'E',
            scope: {
                bcType: '@'
            },
            transclude: true,
            template: '<div class="bc-panel {{bcType}}" ng-transclude></div>'
        };
    })

    .directive('bcFooter',['FooterLabels', function (FooterLabels) {

        return {
            restrict: 'E',
            scope: {
                bcType: '@'
            },
            controller: function ($scope, $element) {
                var type = $scope.bcType;

                $scope.left = FooterLabels[type].left;
                $scope.right = FooterLabels[type].right;
            },
            template: '<div class="bc-footer">' +
                '<p class="left">{{left}}</p>' +
                '<p class="right">{{right}}</p>' +
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
            template: '<div class="bc-title-notes">' +
            '<p>{{bcTitle}}</p>' +
            '<p>{{bcNotes}}</p>' +
            '</div>'
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
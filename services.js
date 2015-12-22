angular.module('app.services', [])

    .factory('FooterLabels', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        return {
            yesNo: {
                left: 'NO',
                right: 'YES'
            },
            sample: {
                left: 'FREE SAMPLE',
                right: 'REVIEW'
            },
            share: {
                left: 'SHARE',
                right: 'EXPLORE'
            }
        }
    });

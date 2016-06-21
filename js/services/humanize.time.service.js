angular.module('grabApp').factory('HumanizeTime', function () {
    return function HumanizeTime(m) {
        //return g
        var g = null;

        //if we can't find a valid or filled moment, we return.
        if (!m || !m.isValid()) {
            return;
        }

        //24hr time to split the afternoon
        var split_afternoon = 12;
        //24hr time to split the evening
        var split_evening = 17;
        var currentHour = parseFloat(m.format("HH"));

        if (currentHour >= split_afternoon && currentHour <= split_evening) {
            g = "afternoon";
        } else if (currentHour >= split_evening) {
            g = "evening";
        } else {
            g = "morning";
        }

        return g;
    }
});

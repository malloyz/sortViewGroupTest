/**
 * Created by malloyzhu on 2015/5/19.
 */

var Util = {
    isBlankString: function (str) {
        return (!str || /^\s*$/.test(str));
    },

    endsWithString: function (str, suffix) {
        if (!Util.isBlankString(str)) {
            return str.match(suffix + "$") == suffix;
        } else {
            return false;
        }
    },

    startsWithString: function (str, prefix) {
        if (!Util.isBlankString(str)) {
            return str.indexOf(prefix) === 0;
        } else {
            return false;
        }
    },

    upperFirstLetter: function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    },

    isArray: function (object) {
        return Object.prototype.toString.call(object) === '[object Array]';
    },

    isObject: function (object) {
        return ((typeof object) === "object");
    }
};


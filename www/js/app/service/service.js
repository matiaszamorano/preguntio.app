preguntio.service = (function () {

    var storage = window.localStorage;

    function get(uri, callback) {
        if (localStorage.getItem(uri) === null) {
            $$.get(uri, null, function (data) {
                console.log("server");
                storage.setItem(uri, data);
                callback(storage.getItem(uri));
            });
        } else {
            console.log("cache");
            callback(storage.getItem(uri));
        }
    }

    return {
        get: get
    };
})();



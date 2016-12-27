preguntio.service = (function () {

    var storage = window.localStorage;

    function get(uri, callback) {
        if (localStorage.getItem(uri) === null) {
            getFromServer(uri, callback);
        } else {
            callback(storage.getItem(uri));
            getFromServer(uri, function () {});
        }
    }
    
    function getFromServer(uri, callback) {
        $$.get(uri, null, function (data) {
            storage.setItem(uri, data);
            callback(storage.getItem(uri));
        });
    }

    return {
        get: get
    };
})();



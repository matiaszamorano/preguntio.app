preguntio.service = (function () {

    var storage = window.localStorage;
    var tiempoCache = 604800000; //10 días
    //var tiempoCache = 100; //no cache

    function get(uri, callback) {
        if (localStorage.getItem(uri) === null) {
            getFromServer(uri, callback);
        } else {
            var object = JSON.parse(storage.getItem(uri));
            var dateString = object.timestamp;
            var now = new Date().getTime().toString();
            var diferencia = now - dateString;
            if (diferencia >= tiempoCache) {
                getFromServer(uri, callback);
            } else {
                console.log("cache");
                callback(object.value);
                getFromServer(uri,function(){});
            }
        }
    }

    function getFromServer(uri, callback) {
        console.log("server");
        $$.get(uri, null, function (data) {
            var object = {value: data, timestamp: new Date().getTime()};
            storage.setItem(uri, JSON.stringify(object));
            callback(JSON.parse(storage.getItem(uri)).value);
        });
    }

    return {
        get: get
    };
})();



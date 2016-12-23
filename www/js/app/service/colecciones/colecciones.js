preguntio.service.colecciones = (function () {

    function get(callback) {
        $$.get('https://preguntio.herokuapp.com/api/colecciones', null, function (data) {
            callback(data);
        });
    }

    return {
        get: get
    };
})();

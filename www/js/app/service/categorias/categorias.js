preguntio.service.categorias = (function () {

    function get(idColeccion, callback) {
        $$.get('https://preguntio.herokuapp.com/api/colecciones/' + idColeccion + '/categorias', null, function (data) {
            callback(data);
        });
    }

    return {
        get: get
    };
})();
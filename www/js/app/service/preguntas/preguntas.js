preguntio.service.preguntas = (function () {

    var keyStoragePreguntasUsuario = "preguntasUsuario";

    function get(callback) {
        $$.get('https://preguntio.herokuapp.com/preguntas', null, function (data) {
            callback(data);
            preguntio.service.setStorage(keyStoragePreguntasUsuario, JSON.stringify(data));
        });
    }

    return {
        get: get
    };
})();

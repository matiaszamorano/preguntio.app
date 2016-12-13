preguntio.service.preguntas = (function () {

    var keyStoragePreguntasUsuario = "preguntasUsuario";
    var keyNoMeGustaPregunta = "preguntasNoMeGusta";

    function get(callback) {
        $$.get('https://preguntio.herokuapp.com/preguntas', null, function (data) {
            callback(data);
            window.localStorage.setItem(keyStoragePreguntasUsuario, data);
        });
    }

    function noMeGusta(pregunta) {
    }

    return {
        get: get
    };
})();

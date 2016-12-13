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
        var preguntas = JSON.parse(window.localStorage.getItem(keyNoMeGustaPregunta));
        if (preguntas == null) {
            preguntas = [];
        }
        preguntas.push(pregunta);
        window.localStorage.setItem(keyNoMeGustaPregunta, JSON.stringify(preguntas));
        console.log(preguntas);
    }

    return {
        get: get,
        noMeGusta: noMeGusta
    };
})();

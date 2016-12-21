preguntio.service.preguntas = (function () {

    var keyStoragePreguntasUsuario = "preguntasUsuario";

    function get(callback) {
        $$.get('https://preguntio.herokuapp.com/api/preguntas', null, function (data) {
            callback(data);
            window.localStorage.setItem(keyStoragePreguntasUsuario, data);
        });
    }

    function guardarOpinion(idPregunta, meGusta) {
        window.localStorage.setItem(idPregunta, meGusta);
    }

    return {
        get: get,
        guardarOpinion: guardarOpinion
    };
})();

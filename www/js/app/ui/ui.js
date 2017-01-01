preguntio.ui = (function () {

    function initTutorial() {
        var welcomescreen_slides = [
            {
                id: 'slide0',
                picture: '<div class="pnt-tutorial-icon">¿?</div>',
                text: 'Bienvenido a Preguntio, la primer app enfocada en las preguntas.'
            },
            {
                id: 'slide1',
                picture: '<div class="pnt-tutorial-icon"><i class="material-icons">fingerprint</i></div>',
                text: 'Porque en el Coaching la clave no son las respuestas, sino las preguntas.'
            },
            {
                id: 'slide2',
                picture: '<div class="pnt-tutorial-icon"><i class="material-icons">build</i></div>',
                text: 'Vas a encontrar cientos de preguntas ordenadas en colecciones según el objetivo.'
            },
            {
                id: 'slide3',
                picture: '<div class="pnt-tutorial-icon"><i class="material-icons">favorite_border</i></div>',
                text: 'Guardá tus colecciones y preguntas favoritas para cuando las necesites.<br><br><a class="pnt-tutorial-close-btn pnt-js-tutorial-close-btn" href="#">Empezar</a>'
            }
        ];

        var options = {
            bgcolor: '#B71427',
            fontcolor: '#FFF',
            closeButtonText: 'Saltar',
            onClosed: preguntio.initApp
        };

        var welcomescreen = myApp.welcomescreen(welcomescreen_slides, options);

        $$(".pnt-js-tutorial-close-btn").click(function () {
            welcomescreen.close();
        });
    }

    return {
        initTutorial: initTutorial
    };
})();

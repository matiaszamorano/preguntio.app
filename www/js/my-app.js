var myApp = new Framework7({
    material: true
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main');

//myApp.init();

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// 
// Tutorial inicial
// 
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
if (!preguntio.service.getStorage("tutorial")) {
    initTutorial();
} else {
    initApp();
}

function initTutorial() {
    var welcomescreen_slides = [
        {
            id: 'slide0',
            picture: '<div class="pnt-tutorial-icon"><i class="material-icons">live_help</i></div>',
            text: 'Bienvenido a Pregunt.io, la aplicación para descubrir preguntas.'
        },
        {
            id: 'slide1',
            picture: '<div class="pnt-tutorial-icon"><i class="material-icons">fingerprint</i></div>',
            text: 'Las preguntas tienen el poder de generar ideas reveladoras.'
        },
        {
            id: 'slide2',
            picture: '<div class="pnt-tutorial-icon"><i class="material-icons">star_border</i></div>',
            text: 'Es hora de dejar de pensar en respuestas y guardar tus preguntas favoritas.<br><br><a class="pnt-tutorial-close-btn pnt-js-tutorial-close-btn" href="#">Empezar</a>'
        }
    ];

    var options = {
        bgcolor: '#009688',
        fontcolor: '#FFF',
        closeButtonText: 'Saltar',
        onClosed: initApp
    };

    var welcomescreen = myApp.welcomescreen(welcomescreen_slides, options);

    $$(".pnt-js-tutorial-close-btn").click(function () {
        welcomescreen.close();
    });
}

$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});
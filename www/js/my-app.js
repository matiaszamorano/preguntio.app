var myApp = new Framework7({
    material: true
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main');

myApp.init();

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// 
// Tutorial inicial
// 
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
initTutorial();

function initTutorial() {
    var welcomescreen_slides = [
        {
            id: 'slide0',
            picture: '<div class="pnt-tutorial-icon">☆</div>',
            text: 'Bienvenido a la aplicación de avisos de Fravega.'
        },
        {
            id: 'slide1',
            picture: '<div class="pnt-tutorial-icon">✲</div>',
            text: 'Selecciná los productos y el porcentaje de descuento de tu interes.'
        },
        {
            id: 'slide2',
            picture: '<div class="pnt-tutorial-icon">♫</div>',
            text: 'Nosotros nos encargamos de avisarte cuando salgan promociones de tu interés.<br><br><a class="pnt-tutorial-close-btn pnt-js-tutorial-close-btn" href="#">Empezar</a>'
        }
    ];

    var options = {
        bgcolor: '#009688',
        fontcolor: '#FFF',
        closeButtonText: 'Saltar'
    };

    var welcomescreen = myApp.welcomescreen(welcomescreen_slides, options);

    $$(".pnt-js-tutorial-close-btn").click(function () {
        welcomescreen.close();
        initApp();
    });
}
//
//$$('a').on('click', function (e) { //Close panel when you open a new page
//    myApp.closePanel();
//});
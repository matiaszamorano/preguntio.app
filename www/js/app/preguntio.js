var preguntio = (function () {

    function init() {
        myApp.onPageInit('login-screen', function (page) {
            var pageContainer = $$(page.container);
            pageContainer.find('.list-button').on('click', function () {
                var usuario = {};
                usuario.username = pageContainer.find('input[name="username"]').val();
                usuario.password = pageContainer.find('input[name="password"]').val();
                preguntio.service.usuario.login(usuario);
                mainView.router.loadPage("index.html");
            });
        });

        if (!preguntio.service.usuario.estaLogeado()) {
            mainView.router.loadPage("login-screen-page.html");
        } else {
            if (!preguntio.service.getStorage("tutorial")) {
                preguntio.ui.initTutorial();
            } else {
                initApp();
            }
        }
        $$('a').on('click', function (e) { //Close panel when you open a new page
            myApp.closePanel();
        });
    }

    function initApp() {
        preguntio.service.setStorage("tutorial", 1);

        preguntio.ui.preguntas.recargarPreguntas();

        $$(document).on('pageInit', function () {
            $$('#enviar-pregunta').on('click', preguntio.ui.preguntas.crearPregunta);
        });
    }

    return {
        init: init,
        initApp: initApp
    };
})();
var preguntio = (function () {

    function init() {
        myApp.onPageInit('login-screen', function (page) {
            var pageContainer = $$(page.container);
            pageContainer.find('.boton-login').on('click', function () {
                var usuario = {};
                usuario.username = pageContainer.find('input[name="username"]').val();
                usuario.password = pageContainer.find('input[name="password"]').val();
                preguntio.service.usuario.login(usuario);
                location.reload();
            });
        });
        mostrarTutorial();
        $$('a').on('click', function (e) { //Close panel when you open a new page
            myApp.closePanel();
        });
        $$('.preguntio-ayuda').on('click', function (e) {
            preguntio.ui.initTutorial();
        });
    }
    function mostrarTutorial() {
        if (!window.localStorage.getItem("tutorial")) {
            preguntio.ui.initTutorial();
            window.localStorage.setItem("tutorial", 1);
        } else {
            initApp();
        }
    }

    function initApp() {
        preguntio.ui.colecciones.init();
        myApp.onPageInit('index', preguntio.ui.colecciones.init);
        myApp.onPageInit('categorias', preguntio.ui.categorias.init);
        myApp.onPageInit('preguntas', preguntio.ui.preguntas.init);
    }

    return {
        init: init,
        initApp: initApp
    };
})();
preguntio.service.usuario = (function () {

    var keyStorageUsuario = "preguntio_usuario";

    function estaLogeado() {
        if (!JSON.parse(window.localStorage.getItem(keyStorageUsuario))) {
            return false;
        }
        return true;
    }

    function login(usuario) {
        window.localStorage.setItem(keyStorageUsuario, usuario);
    }

    function logout() {
        window.localStorage.setItem(keyStorageUsuario, null);
    }

    function registrarUsuario(usuario) {
    }

    return {
        estaLogeado: estaLogeado,
        login: login,
        logout: logout,
        registrarUsuario: registrarUsuario
    };
})();

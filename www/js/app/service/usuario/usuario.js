preguntio.service.usuario = (function () {

    var keyStorageUsuario = "preguntio_usuario";

    function estaLogeado() {
        if (!preguntio.service.getStorage(keyStorageUsuario)) {
            return false;
        }
        return true;
    }

    function login(usuario) {
        preguntio.service.setStorage(keyStorageUsuario, usuario);
    }

    function logout() {
        preguntio.service.setStorage(keyStorageUsuario, null);
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

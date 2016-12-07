preguntio.service = (function () {

    var storage = window.localStorage;

    function getStorage(key) {
        return JSON.parse(storage.getItem(key));
    }

    function setStorage(key, data) {
        storage.setItem(key, JSON.stringify(data));
    }

    return {
        getStorage: getStorage,
        setStorage: setStorage
    };
})();



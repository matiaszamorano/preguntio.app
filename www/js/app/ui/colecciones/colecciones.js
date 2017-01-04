preguntio.ui.colecciones = (function () {

    var url = 'http://preguntio.herokuapp.com/';
    //var url = 'http://localhost:8080/'

    function init() {
        myApp.showPreloader("Cargando...");
        var template = $$('#coleccion-template').html();

        var compiledTemplate = Template7.compile(template);

        preguntio.service.get(url + 'api/colecciones?sort=id,desc', function (data) {
            var colecciones = JSON.parse(data)._embedded;
            colecciones.colecciones.forEach(function (item) {
                if (item.tags) {
                    var tags = item.tags.split(",");
                    item.tags = tags;
                }
            });
            var html = compiledTemplate(colecciones);
            $$('#colecciones').html(html);
            myApp.hidePreloader();
        });

    }

    return {
        init: init
    };
})();




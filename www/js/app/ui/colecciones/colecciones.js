preguntio.ui.colecciones = (function () {

    function init() {
        var template = $$('#coleccion-template').html();

        var compiledTemplate = Template7.compile(template);

        preguntio.service.colecciones.get(function (data) {

            var colecciones = JSON.parse(data)._embedded;
            var html = compiledTemplate(colecciones);
            $$('#colecciones').html(html);
        });
    }

    return {
        init: init
    };
})();




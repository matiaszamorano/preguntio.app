preguntio.ui.categorias = (function () {

    function init(page) {
        preguntio.service.get(page.context.href, function (data) {
            var coleccion = JSON.parse(data);
            $$(".titulo-coleccion").text(coleccion.titulo);
            $$(".descripcion-coleccion").text(coleccion.descripcion);
            preguntio.service.get(coleccion._links.categorias.href, function (data) {
                var template = $$('#categoria-template').html();
                var compiledTemplate = Template7.compile(template);
                var categorias = JSON.parse(data)._embedded;

                var html = compiledTemplate(categorias);
                $$('#listado-categorias').html(html);
            });
        });
    }

    return {
        init: init
    };
})();
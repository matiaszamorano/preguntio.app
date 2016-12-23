preguntio.ui.categorias = (function () {

    function init(page) {
        $$.get(page.context.href, null, function (data) {
            var coleccion = JSON.parse(data);
            $$(".titulo-coleccion").text(coleccion.titulo);
            $$(".descripcion-coleccion").text(coleccion.descripcion);
            $$.get(coleccion._links.categorias.href, null, function (data) {
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
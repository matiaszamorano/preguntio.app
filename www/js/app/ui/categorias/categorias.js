preguntio.ui.categorias = (function () {

    function init(page) {
        $$.get(page.context.href, null, function (data) {
            var coleccion = JSON.parse(data);
            $$(".titulo-categoria").text(coleccion.titulo);
            $$(".descripcion-categoria").text(coleccion.descripcion);
            $$.get(coleccion._links.categorias.href, null, function (data) {
                var template = $$('#categoria-template').html();
                var compiledTemplate = Template7.compile(template);
                var categorias = JSON.parse(data)._embedded;
                console.log(categorias);
                var html = compiledTemplate(categorias);
                console.log(html);
                $$('#listado-categorias').html(html);
            });
        });
    }

    return {
        init: init
    };
})();
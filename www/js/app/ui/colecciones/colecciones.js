preguntio.ui.colecciones = (function () {

    function init() {
        var template = $$('#coleccion-template').html();

        var compiledTemplate = Template7.compile(template);

        $$.get('http://preguntio.herokuapp.com/api/colecciones', null, function (data) {
            var colecciones = JSON.parse(data)._embedded;
            var html = compiledTemplate(colecciones);
            $$('#colecciones').html(html);
        });

    }

    return {
        init: init
    };
})();




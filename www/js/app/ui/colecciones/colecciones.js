preguntio.ui.colecciones = (function () {

    function init() {
        var template = $$('#coleccion-template').html();

        var compiledTemplate = Template7.compile(template);

        preguntio.service.get('http://preguntio.herokuapp.com/api/colecciones?sort=id,desc', function (data) {
            var colecciones = JSON.parse(data)._embedded;
            var html = compiledTemplate(colecciones);
            $$('#colecciones').html(html);
        });

    }

    return {
        init: init
    };
})();




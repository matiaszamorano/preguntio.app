recargarPreguntas();

function recargarPreguntas() {
    var template = $$('#pregunta-template').html();

    var compiledTemplate = Template7.compile(template);

    $$.get('https://preguntio.herokuapp.com/preguntas', null, function (data) {
        var html = compiledTemplate(JSON.parse(data)._embedded);

        $$('#preguntas-slide').html(html);

        var mySwiper = myApp.swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100
        });

    });
}

$$(document).on('pageInit', function () {
    var queryForm = null;
    $$('#enviar-pregunta').on('click', function () {
        queryForm = myApp.formToJSON('#nueva-pregunta-form');
        var parameters = {
            url: 'https://preguntio.herokuapp.com/preguntas',
            method: "POST",
            cache: false,
            contentType: "application/json",
            processData: true,
            success: function (data) {
                myApp.addNotification({
                    message: 'Pregunta Enviada'
                });
                recargarPreguntas();
                myApp.mainView.back();
            },
            dataType: 'json',
            data: JSON.stringify(queryForm)
        };

        $$.ajax(parameters);
        return false;
    });
});

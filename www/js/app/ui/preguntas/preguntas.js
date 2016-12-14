preguntio.ui.preguntas = (function () {

    var mySwiper;

    function recargarPreguntas() {
        var template = $$('#pregunta-template').html();

        var compiledTemplate = Template7.compile(template);

        preguntio.service.preguntas.get(function (data) {

            var preguntas = JSON.parse(data)._embedded;
            for (var i = 0; i < preguntas.preguntas.length; i++) {
                preguntas.preguntas[i].meGusta = window.localStorage.getItem(preguntas.preguntas[i]._links.self.href);
            }

            var html = compiledTemplate(preguntas);
            $$('#preguntas-slide').html(html);

            mySwiper = myApp.swiper('.swiper-container-preguntas', {
                speed: 400,
                spaceBetween: 100
            });

            pintarOpinion();

            $$('.borrar-pregunta').on('click', borrarPregunta);

            $$('.preguntio-opinion').on('click', guardarOpinion);

            mySwiper.on('onSlideChangeEnd', pintarOpinion);
        });
    }

    function pintarOpinion() {
        var opinion = $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta');
        if (opinion === "1") {
            $$(".me-gusta-icono").addClass("verde");
            $$(".no-me-gusta-icono").removeClass("verde");
        } else if (opinion === "0") {
            $$(".me-gusta-icono").removeClass("verde");
            $$(".no-me-gusta-icono").addClass("verde");
        } else {
            $$(".me-gusta-icono").removeClass("verde");
            $$(".no-me-gusta-icono").removeClass("verde");
        }
    }

    function guardarOpinion() {
        var meGusta = $$(this).attr('data-opinion');
        $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta', meGusta);
        var id = $$(".swiper-slide.swiper-slide-active").attr('data-id');
        preguntio.service.preguntas.guardarOpinion(id, meGusta);
        if (meGusta === "1") {
            mySwiper.slideNext();
        } else if (meGusta === "0") {
            mySwiper.removeSlide(mySwiper.activeIndex);
        }
        pintarOpinion();
    }

    function crearPregunta() {
        queryForm = myApp.formToJSON('#nueva-pregunta-form');
        var parameters = {
            url: 'https://preguntio.herokuapp.com/preguntas',
            method: "POST",
            cache: false,
            contentType: "application/json",
            processData: true,
            success: function (data) {
                myApp.mainView.back();
                myApp.addNotification({
                    message: 'Pregunta Enviada',
                    closeOnClick: true
                });
                recargarPreguntas();
            },
            dataType: 'json',
            data: JSON.stringify(queryForm)
        };

        $$.ajax(parameters);
        return false;
    }

    function borrarPregunta() {
        var url = $$(this).attr('data-url');
        var parameters = {
            url: url,
            method: "DELETE",
            processData: true,
            complete: function (data) {
                mySwiper.removeSlide(mySwiper.activeIndex);
                myApp.addNotification({
                    message: 'Pregunta Eliminada',
                    closeOnClick: true,
                });
            },
            dataType: 'json'
        };
        $$.ajax(parameters);

        return false;
    }

    return {
        recargarPreguntas: recargarPreguntas,
        crearPregunta: crearPregunta,
        borrarPregunta: borrarPregunta
    };
})();




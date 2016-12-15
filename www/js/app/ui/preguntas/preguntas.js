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

            $$('.izquierda').on('click', function () {
                mySwiper.slidePrev();
            });

            $$('.derecha').on('click', function () {
                mySwiper.slideNext();
            });

            mySwiper.on('onSlideChangeStart', pintarOpinion);
        });
    }

    function pintarOpinion() {
        var opinion = $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta');
        var $meGusta = $$(".me-gusta-icono");
        if (opinion === "1") {
            $meGusta.html("<i class='material-icons'>favorite</i>");
            $meGusta.addClass("active");
        } else {
            $meGusta.html("<i class='material-icons'>favorite_border</i>");
            $meGusta.removeClass("active");
        }
    }

    function guardarOpinion() {
        var $meGusta = $$(".me-gusta-icono");
        var id = $$(".swiper-slide.swiper-slide-active").attr('data-id');
        var meGusta = 1;
        if ($meGusta.hasClass("active")) {
            meGusta = 0;
        }
        preguntio.service.preguntas.guardarOpinion(id, meGusta);
        $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta', meGusta);
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




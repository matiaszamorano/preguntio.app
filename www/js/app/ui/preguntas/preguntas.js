preguntio.ui.preguntas = (function () {

    var mySwiper;
    var timeoutOpinion;

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

            mySwiper.on('onSlideChangeStart', pintarOpinion);
        });
    }

    function pintarOpinion() {
        $$(".toolbar-preguntio").css("visibility", "hidden");
        var opinion = $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta');
        var $noMeGusta = $$(".no-me-gusta-icono");
        var $meGusta = $$(".me-gusta-icono");
        $noMeGusta.addClass("white");
        $$(".me-gusta-icono").addClass("white");
        if (opinion === "1") {
            $meGusta.addClass("white");
            $meGusta.removeClass("grey");
            $noMeGusta.addClass("grey");
            $noMeGusta.removeClass("white");
        } else if (opinion === "0") {
            $meGusta.addClass("grey");
            $meGusta.removeClass("white");
            $noMeGusta.addClass("white");
            $noMeGusta.removeClass("grey");
        } else {
            $meGusta.removeClass("grey");
            $noMeGusta.removeClass("grey");
        }
        clearTimeout(timeoutOpinion);
        timeoutOpinion = setTimeout(function () {
            document.getElementById('toolbar').style.visibility = "visible";
        }, 2000);
    }

    function guardarOpinion() {
        var meGusta = $$(this).attr('data-opinion');
        $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta', meGusta);
        var id = $$(".swiper-slide.swiper-slide-active").attr('data-id');
        preguntio.service.preguntas.guardarOpinion(id, meGusta);
        if (meGusta === "1") {
            mySwiper.slideNext();
        } else if (meGusta === "0") {
            var actual = mySwiper.activeIndex;
            mySwiper.slideNext();
//            mySwiper.removeSlide(actual);
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




preguntio.ui.preguntas = (function () {

    var mySwiper;

    function recargarPreguntas(page) {
        preguntio.service.get(page.context.href, function (data) {
            var categoria = JSON.parse(data);
            $$(".titulo-categoria").text(categoria.titulo);
            preguntio.service.get(categoria._links.preguntas.href, function (data) {
                var template = $$('#pregunta-template').html();
                var compiledTemplate = Template7.compile(template);
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

                $$('.preguntio-opinion').on('click', guardarOpinion);

                $$('.izquierda').on('click', function () {
                    mySwiper.slidePrev();
                    return false;
                });

                $$('.derecha').on('click', function () {
                    mySwiper.slideNext();
                    return false;
                });

                mySwiper.on('onSlideChangeStart', pintarOpinion);

                mySwiper.on('onSlideChangeEnd', function () {
                    if (mySwiper.isBeginning) {
                        $$(".izquierda i").addClass("no-visible");
                    } else {
                        $$(".izquierda i").removeClass("no-visible");
                    }
                    if (mySwiper.isEnd) {
                        $$(".derecha i").addClass("no-visible");
                    } else {
                        $$(".derecha i").removeClass("no-visible");
                    }
                });
            });
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

    function guardarOpinion(event) {
        event.preventDefault();
        var $meGusta = $$(".me-gusta-icono");
        var id = $$(".swiper-slide.swiper-slide-active").attr('data-id');
        var meGusta = 1;
        if ($meGusta.hasClass("active")) {
            meGusta = 0;
        }
        preguntio.service.preguntas.guardarOpinion(id, meGusta);
        $$(".swiper-slide.swiper-slide-active").attr('data-me-gusta', meGusta);
        pintarOpinion();
        return false;
    }

    function init(page) {
        recargarPreguntas(page);
    }

    return {
        init: init,
        recargarPreguntas: recargarPreguntas
    };
})();




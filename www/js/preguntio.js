var template = $$('#pregunta-template').html();

var compiledTemplate = Template7.compile(template);

var context = {
    "preguntas": [{
            "contenido": "¿Qué expectativas tenés para el año que viene?",
            "_links": {
                "self": {
                    "href": "https://preguntio.herokuapp.com/preguntas/1"
                },
                "pregunta": {
                    "href": "https://preguntio.herokuapp.com/preguntas/1"
                }
            }
        }, {
            "contenido": "¿En qué cosa nueva querés invertir tu tiempo?",
            "_links": {
                "self": {
                    "href": "https://preguntio.herokuapp.com/preguntas/2"
                },
                "pregunta": {
                    "href": "https://preguntio.herokuapp.com/preguntas/2"
                }
            }
        }, {
            "contenido": "¿Qué le contas a otros de tu lugar de trabajo?",
            "_links": {
                "self": {
                    "href": "https://preguntio.herokuapp.com/preguntas/3"
                },
                "pregunta": {
                    "href": "https://preguntio.herokuapp.com/preguntas/3"
                }
            }
        }]
};
var html = compiledTemplate(context);

$$('#preguntas-slide').html(html);

var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100
});   
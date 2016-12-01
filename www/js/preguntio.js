var template = $$('#pregunta-template').html();

var compiledTemplate = Template7.compile(template);

//$$.get('https://preguntio.herokuapp.com/preguntas', null, function (data) {
//    var html = compiledTemplate(JSON.parse(data)._embedded);
//
//    $$('#preguntas-slide').html(html);
//
//    var mySwiper = myApp.swiper('.swiper-container', {
//        speed: 400,
//        spaceBetween: 100
//    });
//
//});

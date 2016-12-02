var myApp = new Framework7({
    material: true
});
var mainView = myApp.addView('.view-main');

var $$ = Dom7;

$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});

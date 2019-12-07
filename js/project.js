$(document).ready(() => {
$('#recipe').on('change', ()=> {
    var fruit = $('#recipe').val();
    console.log(fruit);
    choose(fruit);
});
});
var choose = (data) => {
    switch(parseInt(data)) {
       case 1:
           getApple();
           break;
        case 2:
            getBanana();
            break;
        case 3:
            getCoconut();
    }
}
var getApple =()=> {
    var apple = "I love Apple";
    prontOut(apple);
}
var getBanana =()=> {
    var banana = "I love Apple";
    prontOut(banana);
}
var getCoconut =()=> {
    var coconut = "I love Apple";
    prontOut(coconut);
}
var prontOut = (out) => {
    $('#done').html(out);
}
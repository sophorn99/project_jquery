function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $('#recipe').on('change', function () {
        $('#instructions').html("Instructions");
        var recipeId = $('#recipe').val();
        eachRecipe(recipeId);
    });
});

//click for increase and decrease number
$('#add1').on('click', function(){
    var getValue = $('#member').val();
    userClickUp(getValue); 
});

$('#add2').on('click', function(){
    var getValue = $('#member').val();
    userClickDonw(getValue); 
});

function userClickUp(add){
    var getValue = parseInt(add) + 1;
    if(getValue <= 15){
        $('#member').val(getValue);
        calulateGuest($("#member").val()); 
    }
}
function userClickDonw(minus){
    var getValue = parseInt(minus) - 1;
    if(getValue >= 1){
        $('#member').val(getValue);
        calulateGuest($("#member").val());
    }
}

function calulateGuest(guests) {
    var getDivis;
    var newQuanlity;
    var result = "";
    quanlities.ingredients.forEach(element => {
        var {quantity} = element;
        getDivis = quantity / getOldGuests;
        newQuanlity = getDivis * guests;
        result += `
        <tr>
            <td><img src="${element.iconUrl}" width="60"></td>
            <td>${element.name}</td>
            <td>${newQuanlity}</td>
            <td>${element.unit[0]}</td>
        </tr>
    `;
    });
     $("#done").html(result);
}

function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data")
    });
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `
            <option value="${item.id}">${item.name}</option>
        `;
    });
    $('#recipe').append(option);
}
$('#border').hide()
$('#hide-show').hide()
function eachRecipe(id) {

    allData.forEach(item => {
        if (item.id == id) {
            //showRecipe
            showRecipe(item.name, item.iconUrl, item.nbGuests);
            //showIngredient
            showIngredient(item.ingredients);
            //showStep()....
            showStep(item.instructions);
            // console.log(item.instructions);
            quanlities = item;
            getOldGuests = item.nbGuests;
        }
    });
    $('#border').show()
    $('#hide-show').show()
}
//show recipe
function showRecipe(name, img , guest) {
    var result = "";
    var input = "";
    result += `
    <div class="col-3"></div>
    <div class="col-3"><h2 class="text-white width="10px">${name}</h2></div>
    <div class="col-3"><img src="${img}"width="200" class="img-thumbnail"></div>
    <div class="col-3"></div>
   `;
    $('#recipe-result').html(result);

    input = `
        <input type="number" value="${guest}" class="form-control text-center" id="member" disabled>
    `;
    $('#input').html(input);
}
function showIngredient(ingredient) {
    $('#indradient').html("Ingredients");
    var result1 = "";
    ingredient.forEach(item => {
        result1 += `
        <tr>
             <td><img src="${item.iconUrl}" width="60" class="rounded"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
        $('#done').html(result1);
    });
}
function showStep(step) {
    var results = "";
    var cut = step.split("<step>");
    for (let i = 1; i < cut.length; i++) {
        results += `
            <tr>
                <td><strong class="text-primary">step${i}:</strong> <br> ${cut[i]}</td>
            </tr>
        `;
    }
    $('#show').html(results);

}
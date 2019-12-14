function getUrl() {
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
    getApi();
    $('#recipe').on('change',function(){
        var recipeId = $('#recipe').val();
        eachRecipe(recipeId);
    });
});
function getApi(){
    $.ajax({
        dataType:'json',
        url:getUrl(),
        success:(data) => chooseRecipe(data.recipes),
        error:()=> console.log("Cannot get data")
    });
}
var allData =[];
function chooseRecipe(recipe){
    allData = recipe;
    var option ="";
    recipe.forEach(item => {
        option +=`<option value="${item.id}">${item.name}</option>`;
    });
    $('#recipe').append(option);
}
function eachRecipe(id){
    allData.forEach(item => {
        if(item.id==id){
           //showRecipe
           showRecipe(item.name ,item.iconUrl);
           //showIngredient
           showIngredient(item.ingredients);
           //showStep()....
            showStep(item.instructions);
            // console.log(item.instructions);
        }
    });
}
function showStep(step){
    var results ="";
    var cut = step.split("<step>");
    for(let i = 1; i < cut.length;i++){
        results +=`
            <tr>
                <td><strong class="text-primary">step</strong>${i}: <br> ${cut[i]}</td>
            </tr>
        `;
    }
    $('#show').html(results);

}
function showRecipe(name,img){
   var result = "";
   result +=`
        <img src="${img}"width="100">
        <h2>${name}</h2>
   `;
   $('#recipe-result').html(result);
}
function showIngredient(ingredient) {
   var result1 ="";
    ingredient.forEach(item => {
        result1 += `
        <tr>
            <td><img src="${item.iconUrl}" width="100"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
    $('#done').html(result1);
    });
}
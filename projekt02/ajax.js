$( document ).ready(function() {

$("#login_form").on("submit", function( event ) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/login",
        data: $(this).serialize(),
        success: function(response) {
            alert(response);
        },
        error: function(response) {
            alert(response.responseText);
        }
    })
});


// CREATE
$("#survey_form").on("submit", function( event ) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/survey",
        data: $(this).serialize(),
        success: function(data) {
            alert('Dodano ankiete.');
        },
        error: function(){
            alert('Nie udalo sie dodac ankiety.');
        }
    })
});

$("#save_locally").click(function (event){
    let form_data = $("#survey_form").serialize();
    var survey = QueryStringToJSON(form_data)
    addObjectToStore('surveys', survey);
})

function QueryStringToJSON(queryString) {            
    var pairs = queryString.split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

$("#results_offline").click(function (event) {
    event.preventDefault();
    readData('surveys');
    $.ajax({
        type: "GET",
        url: "/survey_results_offline",
        data: {global_results}
    })
});

});
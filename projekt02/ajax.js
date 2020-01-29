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

// // DELETE
// $("#delete_form").on("submit", function( event ) {
//     event.preventDefault();

//     var book_id = document.querySelector("#delete_form > #book_id").value;
//     $.ajax({
//         type: "DELETE",
//         url: "/biblioteka/" + book_id,
//         data: {},
//         success: function(data) {
//             alert('Usunieto ksiazke o ID: ' + book_id);
//         },
//         error: function(){
//             alert('Ksiazka o podanym ID nie istnieje');
//         }
//     })
// });

// // UPDATE
// $("#update_form").on("submit", function( event ) {
//     event.preventDefault();
//     var book_id = document.querySelector("#update_form > #book_id").value;
//     $.ajax({
//         type: "PUT",
//         url: "/biblioteka/" + book_id,
//         data: $(this).serialize(),
//         success: function(data) {
//             alert('Zmodyfikowano ksiazke.');
//         },
//         error: function(){
//             alert('Nie udalo sie zmodyfikowac ksiazki.');
//         }
//     })
// });

});
$( document ).ready(function() {


// CREATE
$("#create_form").on("submit", function( event ) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/biblioteka",
        data: $(this).serialize(),
        success: function(data) {
            alert('Dodano ksiazke.');
        },
        error: function(){
            alert('Nie udalo sie dodac ksiazki.');
        }
    })
});

// DELETE
$("#delete_form").on("submit", function( event ) {
    event.preventDefault();

    var book_id = document.querySelector("#delete_form > #book_id").value;
    $.ajax({
        type: "DELETE",
        url: "/biblioteka/" + book_id,
        data: {},
        success: function(data) {
            alert('Usunieto ksiazke o ID: ' + book_id);
        },
        error: function(){
            alert('Ksiazka o podanym ID nie istnieje');
        }
    })
});

// UPDATE
$("#update_form").on("submit", function( event ) {
    event.preventDefault();
    var book_id = document.querySelector("#update_form > #book_id").value;
    $.ajax({
        type: "PUT",
        url: "/biblioteka/" + book_id,
        data: $(this).serialize(),
        success: function(data) {
            alert('Zmodyfikowano ksiazke.');
        },
        error: function(){
            alert('Nie udalo sie zmodyfikowac ksiazki.');
        }
    })
});

});
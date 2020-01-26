$( document ).ready(function() {

// $("#submit_note").click(function(){
//     console.log("click");
//     console.log("serialized: " + $(this).serialize());
//     $.ajax({
//         type: "POST",
//         url: "/notatki",
//         data: $("#submit_note").serialize(),
//         success: function(data) {
//             console.log("data: " + data);
//         }
//     })
// })

// CREATE
$("#create_form").on("submit", function( event ) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/notatki",
        data: $(this).serialize(),
        success: function(data) {
            console.log("data: " + data);
        }
    })
});

});
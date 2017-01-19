// lo que se tiene que ejecutar cuando el document ready
var $ = require('jquery');

$(document).ready(function() {
    $("#new-song").on("click", function() {
        if ($(this).data("status") == "ui-form-shown") {
            $("body").removeClass().addClass("ui-song-list-shown");
            $(this).data("status" , "ui-song-list-shown");
        } else {
            $("body").removeClass().addClass("ui-form-shown");
            $(this).data("status" , "ui-form-shown");
        }
    });
});
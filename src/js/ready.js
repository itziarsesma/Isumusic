// lo que se tiene que ejecutar cuando el document ready
var $ = require('jquery');
var uiManager = require('./uiManager');

$(document).ready(function() {
    $("#new-song").on("click", function() {
        uiManager.toogleForm();
    });
});
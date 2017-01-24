var $ = require('jquery');
var SongsService = require("./SongsService");

$('.new-song-form').on("submit", function() {
    var self = this;
    //validacion rápida de inputs
    var inputs = $(this).find("input").each( function(i) {
       //para cada input dentro de un form (this)
       var input = this;
       if (input.checkValidity() == false) {
           alert(input.validationMessage);
           input.focus();
           return false;
       }
    });

     // con todos los campos OK, guardamos en el backend la cancion

     //creamos el objeto cancion
       var song = {
           artist: $("#artist").val(),
           title: $("#title").val(),
           audio_url: $("#audio_url").val(),
           cover_url: $("#cover_url").val(),
       };
       // antes de enviar el formulario bloquer el boton
       $(this).find("button").text("Saving song...").attr("disabled", true);

       // lo enviamos al backend
       SongsService.save(song, function(data) {
           alert("Cancion guardada correctamente");
           self.reset(); // resetea el formulario
           $(self).find("button").text("Save song").attr("disabled", false); //TODO: refactorizar
       }, 
       function(error) {
           alert("Se ha producido un error");
           $(self).find("button").text("Save song").attr("disabled", false); //TODO: refactorizar
       });
       
    return false;  // no queremos enviar el formulario nunca
});
var $ = require("jquery");

var API_URL = "api/songs/";

module.exports = {

    // recuperar todas las canciones
    list: function(successCallback, errorCallback) {
        $ajax({
            url: API_URL,
            type: "get", // recuperar datos de un api rest
            success: function(data) {
                successCallback(data);
            },
            error: function(error ) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        });
    },

    // recuperar una canción
    get: function(songId, successCallback, errorCallback) {
        // get a /api/songs/<songId>
    },

    // guardar una canción
    save: function(song, successCallback, errorCallback) {
        $.ajax({
           url: API_URL,
           type: "post", // post -> crear una cancion
           data: song,
           success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                    console.error("SongsServiceError", error);
                }
       });
    },

    // borrar una canción
    delete: function(songId, successCallback, errorCallback) {
        $.ajax({
            url: API_URL + songId,
            type: "delete",
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        });
    }
};
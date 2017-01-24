var $ = require('jquery');

module.exports = {

    uiStatus: "ui-song-list-shown",

    toogleForm: function() {
         if (this.uiStatus == "ui-form-shown") {
            $("body").removeClass().addClass("ui-song-list-shown");
            this.uiStatus = "ui-song-list-shown";
        } else {
            $("body").removeClass().addClass("ui-form-shown");
           this.uiStatus = "ui-form-shown";
        }
    }
}
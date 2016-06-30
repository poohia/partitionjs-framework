var index = function() {
    
    var _selectors = {
        test_pseudo : '#testPseudo',
        name        : '#name'
    }
    
    function init() {
        $(_selectors.test_pseudo).on("click", function(e) {
            var pseudoValue = $("#name").val();
            if (pseudoValue.length > 0) {
                // AJAX REQUEST 
                $.get('/xhr/pseudo/' + pseudoValue)
                    .done(function(data) {
                        if (data.pseudo) {
                            $(_selectors.name).removeClass("valid").addClass("invalid");
                        }
                        else {
                            $(_selectors.name).removeClass("invalid").addClass("valid");
                        }
                    })
                    .fail(function(data) {
                        console.log(data);
                    });
            }
            return false;
        })
    }

    return {
        init: init
    }
}();

$(document).ready(function() {
    'use strict';
    index.init();
});
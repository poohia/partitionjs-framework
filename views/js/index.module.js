$(document).ready(function(){
   'use strict';
   $("#testPseudo").on("click", function(e)
   {
       var pseudoValue = $("#name").val();
       if(pseudoValue.length > 0)
       {      
           // AJAX REQUEST 
           $.get('/xhr/pseudo/' + pseudoValue)
           .done(function(data){
              if(data.pseudo)
              {
                  $("#name").removeClass("valid").addClass("invalid");
              }
              else
              {
                  $("#name").removeClass("invalid").addClass("valid");
              }
           })
           .fail(function(data){
               console.log(data);
           }); 
       }
       return false;
   })
});
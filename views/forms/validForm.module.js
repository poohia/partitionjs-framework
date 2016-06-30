var validForm = function(){
	'use strict';
	
	var _forms = {
		login : '#form_signin',
		signup : '#form_signup',
		logout : '#form_logout',
	}
	
	function logout()
	{
		var isValid = true;
		var isToken = token(this);
		return (isValid && isToken);
	}

	function login(){
	    
		var isValid = true;

	    var items = {
	      $email : $("#email"),
	      $password : $("#password")
	    }

	    if(validator.password(items.$password.val()))
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	isValid = false ;
	    }
	    if(validator.email(items.$email.val()))
	    {
	        items.$email.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	        items.$email.removeClass("valid").addClass("invalid");
	        isValid = false ;
	    }
	    var isToken = token(this);
	    return (isValid && isToken); 
	};

	function signup(){
		var isValid = true;

		var items = {
	      $email : $("#signup_email"),
	      $password : $("#signup_password"),
	      $password_again : $("#password_again"),
	      $speudo         : $("#name"),
	      $sexe			  : $("input[name=sexe]:checked")
	    }

	    if(validator.password(items.$password.val()) && (items.$password_again.val() === items.$password.val()) )
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    	items.$password_again.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	items.$password_again.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
	    if(validator.email(items.$email.val()))
	    {
	    	items.$email.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$email.removeClass("valid").addClass("invalid");
	    	isValid = false;

	    }
	    if(validator.no_Empty(items.$speudo.val()))
	    {
	    	items.$speudo.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$speudo.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
		if(validator.sexe(items.$sexe.val()))
	    {
	    	items.$sexe.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$sexe.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
        var isToken = token(this);
	    return (isValid && isToken); 
	};
	function token($form)
	{
		var $token = $("input[name='token']", $form);
		
		if($token.val().length != 0)
			return false;
		else
			return true;
			
	};

	function init(){
		$(_forms.login).on("submit",login);
		$(_forms.signup).on("submit",signup);
		$(_forms.logout).on("submit",logout);

	}

	return {
		init: init
	}

}();
$(document).ready(function() {
	console.log("ready");
	

	$("#EmailBtn").on("click", ()=> {
		event.preventDefault();
		

		var emailInfo = {
			name: $("#emailName").val().trim(),
			from: $("#emailFrom").val().trim(),
			text: $("#emailText").val().trim(),
			subject: $("#emailSubject").val().trim()
		};
		
		var arr = checkEmailForm(emailInfo);

		if (arr.length !== 0) {
			$.toast({
				    heading: 'Error',
				    text: arr,
				    icon: 'error',
				    loader: true,
				    position: "top-left"
				})
		} else {

			$.post( "/api/email", emailInfo ,function( response ) {
	  			console.log(response);
	  			if (response === "sent") {
		  			$.toast({
					    heading: 'Success',
					    text: 'Email Sent.',
					    icon: 'info',
					    loader: true,
					    position: "top-left"  
					});

					$("#emailName").removeClass("uk-form-danger");
					$("#emailFrom").removeClass("uk-form-danger");
					$("#emailText").removeClass("uk-form-danger");
					$("#emailSubject").removeClass("uk-form-danger");
					
				} else {
					$.toast({
					    heading: 'Error',
					    text: 'Email Failed.',
					    icon: 'error',
					    loader: true,
					    position: "top-left" 
					})
					
				}

				$("#emailForm")[0].reset();
			});

		}
	});
	
});


function checkEmailForm (emailInfo) {
	var errors = [];

	if (emailInfo.name === "") {
		errors.push("Name cannot be empty");
		$("#emailName").addClass("uk-form-danger");	
	}
	if (emailInfo.from === "") {
		errors.push("Email cannot be empty");
		$("#emailFrom").addClass("uk-form-danger");
	}
	if (emailInfo.text === "") {
		errors.push("Message cannot be empty");
		$("#emailText").addClass("uk-form-danger");
	}
	if (emailInfo.subject === "") {
		errors.push("Subject cannot be empty");
		$("#emailSubject").addClass("uk-form-danger");
	}



	return errors;
}
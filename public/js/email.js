$(document).ready(function() {
	console.log("ready");
	$.toast({
				    heading: 'Email',
				    text: 'Email Sent.',
				    icon: 'info',
				    loader: true,  // To change the background
				    position: "top-left"
				})

	$("#EmailBtn").on("click", ()=> {
		event.preventDefault();
		

		var emailInfo = {
			name: $("#emailName").val().trim(),
			from: $("#emailFrom").val().trim(),
			text: $("#emailText").val().trim(),
			subject: $("#emailSubject").val().trim()
		};
		console.log(emailInfo);
		$.post( "/api/email", emailInfo ,function( response ) {
  			console.log(response);
  			if (response === "sent") {
	  			$.toast({
				    heading: 'Success',
				    text: 'Email Sent.',
				    icon: 'info',
				    loader: true,
				    position: "top-left"  
				})
				
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

		
	});
});
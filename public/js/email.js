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
		console.log(emailInfo);
		$.post( "/api/email", emailInfo ,function( response ) {
  			console.log(response);
  			if (response === "sent") {
	  			UIkit.notification({
				    message: "<span uk-icon=\'icon: check\'></span> Email Sent!",
				    status: 'success',
				    pos: 'bottom-right',
				    timeout: 5000
				});
				$("#emailForm")[0].reset();
			} else {
				UIkit.notification({
				    message: "<span uk-icon=\'icon: close\'></span> Email failed!",
				    status: 'danger',
				    pos: 'bottom-right',
				    timeout: 5000
				});
				$("#emailForm")[0].reset();
			}
		});

		
	});
});
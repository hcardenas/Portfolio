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
		});

	})
});
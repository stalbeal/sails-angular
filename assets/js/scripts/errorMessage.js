
	$(document).ready(function() {
	if ($('#message').val()) {

	$('#errorMessage').append(' <p class="heading h2 center">' + $('#message').val() + '</p>');
	$('#modalAlert').openModal();
	//$("#modalError").modal('show');
	}
	});

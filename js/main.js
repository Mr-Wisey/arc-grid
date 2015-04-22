$(document).ready( function() {
	$('.trigger').not('.trigger_active').closest('section').find('.toggle_container').hide();
	$('.trigger_active').closest('section').find('.toggle_container').show();
	$('.trigger').click( function() {
		var trig = $(this);
		if ( trig.hasClass('trigger_active') ) {
			trig.closest('section').find('.toggle_container').slideToggle('500');
			trig.removeClass('trigger_active');
		} else {
			$('.trigger_active').closest('section').find('.toggle_container').slideToggle('500');
			$('.trigger_active').closest('section').find('.toggle_container');
			$('.trigger_active').removeClass('trigger_active');
			trig.closest('section').find('.toggle_container').slideToggle('500');
			trig.addClass('trigger_active');
		};
		$('html, body').animate({
			scrollTop: $(this).offset().top
		}, 1000);
		return false;
	});
});



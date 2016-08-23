// JavaScript File
'use strict'

$(document).ready(function(){
	$('#loginButton').click(function(val){
		var name = $('#name').val();
		$('#hiddenMessage').show();
		$('#insertName').html(name);
	});
});

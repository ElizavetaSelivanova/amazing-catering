	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json', true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) $('.page-bottom_green').show();
			else if(xmlhttp.status == 500) alert('Check apikey');
			else alert('Request error');
		}
	};

	var phoneInput = $('._phone').val();
	xmlhttp.send(JSON.stringify({'key': 'nSXODzMepAJrvxyVKISaKw',
		'message': {
			'from_email': 'lizzi_s@mail.ru',
			'to': [{'email': 'lizzi_s@mail.ru', 'type': 'to'}],
			'autotext': 'true',
			'subject': 'Call',
			'html': '<h1>' + phoneInput + ' - this is number </h1>'
		}}));



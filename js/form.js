function loadForm(){
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

	var phoneInput = $('._phone').val(),
		nameInput = $('._name').val();
	xmlhttp.send(JSON.stringify({'key': 'Yu39ToTLVFq5N_-wXlC_AA',
		'message': {
			'from_email': 'info@acatering.by',
			'to': [{'email': 'acateringminsk@gmail.com', 'type': 'to'}],
			'autotext': 'true',
			'subject': 'Заявка на обратный звонок',
			'html': '<h2> Необходимо перезвонить. Отправил(a) заявку: '+ nameInput +', телефонный номер: ' + phoneInput + '</h2>'
		}}));
}




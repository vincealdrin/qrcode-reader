$(document).ready(() => {
	var init = Cookies.getJSON('listCookie');
	var list = init ? [].concat(init) : [];
	var beep = new Audio('./assets/	beep.wav');
	console.log(init);
	if (list.length > 1) {
		list.forEach((data) => {
			if (data) {
				$('#dataList').append(`<li>${data}</li>`);
			}
		});
	}

	$('#reader').html5_qrcode((data) => {
		if (list.indexOf(data) === -1) {
			// fetchival('/save').post({
			// 	serial: data
			// }).then(() => console.log('success'));
			list.push(data);
			$('#dataList').append(`<li>${data}</li>`);
			Cookies.set('listCookie', list, {expires: 31});
			$('#webcam').css('border', '50px solid #2ecc71');
			beep.play();
			setTimeout(() => $('#webcam').css('border', '50px solid white'), 800);
	 } else {
		 $('.info').css('background-color', '#c0392b');
		 $('#read_error').html('Serial already exists.');
		 setTimeout(() => $('.info').css('background-color', 'white'), 400);

	 }
	},
	(error) => {
		if (error === "Couldn't find enough finder patterns") {
			$('#read_error').html('Scanning...');
		} else {
			$('#read_error').html(error);
		}
	}, (vid_err) => alert);

	$('#dl').click(() => {
		if (list.length < 1) return $('#read_error').html('There is no list to download!');
		var fileData = new Blob([list.reduce((p, c) => `${p}\n${c}`)], {type: 'text/plain'});

		$('#dl').attr('href', window.URL.createObjectURL(fileData));
	});

	$('#clear').click(() => {
		var confirmClear = confirm("Are you sure you want to remove the current list?");
		if (confirmClear) {
			$('#dataList').remove();
			list.splice(0);
			console.log(list);
			Cookies.remove('listCookie', {path: ''});
		}
	});
	$('#html5_qrcode_video').attr('src', 'assets/wew.mp4');
});

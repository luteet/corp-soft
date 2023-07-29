function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				popup.style.removeProperty('display');

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							function openFunc() {
								popupCheck = true;
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 0)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.style.display = 'none';
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init();

function generatorVh() {
	const html = document.querySelector('html');
	//let windowSize = 0;
	html.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
	window.addEventListener('resize', function () {
		html.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
		
	})
}

generatorVh();

$(function () {

	const telInputs = document.querySelectorAll('[type="tel"]');
	telInputs.forEach(tel => {
		const iti = window.intlTelInput(tel, {
			initialCountry: "auto",
			hiddenPhoneInput: "full_number",
			formatOnDisplay: true,
			geoIpLookup: callback => {
			  fetch("https://ipapi.co/json")
				.then(res => res.json())
				.then(data => callback(data.country_code))
				.catch(() => callback("us"));
			},
			utilsScript: "utils.js" // just for formatting/placeholders etc
		});
		
		//iti['a'].parentElement.insertAdjacentHTML("beforeend", `<input value />`)

		tel.addEventListener("countrychange", function() {
			var selectedCountryData = iti.getSelectedCountryData();
	
			// Get an example number for the selected country to use as placeholder.
			newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
	
			// Reset the phone number input.
			iti.setNumber("");
	
			// Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
			mask = newPlaceholder.replace(/[1-9]/g, "0");
	
			// Apply the new mask for the input
			$(tel).mask(mask);
		});
	
		const form = tel.closest('form');
		form.addEventListener('submit', function (event) {
			//event.preventDefault();)
			
			if(!iti.isValidNumber()) {
				event.preventDefault();
				tel.classList.add('error');
			} else {
				tel.classList.remove('error');
			}
		})


	
		tel.addEventListener('input', function () {
			if(tel.classList.contains('error')) {
				if(iti.isValidNumber()) tel.classList.remove('error');
			}
		})
		
	})
})



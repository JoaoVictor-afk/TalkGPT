micButtonEnable(false);

if (localStorage.hasOwnProperty("checkbox")) {
	switch (localStorage.getItem("checkbox")) {
		case "true":
			checkbox.checked = true;
			break;
		case "false":
			checkbox.checked = false;
			break;
		default:
			checkbox.checked = true;
	}
}

var api_key = localStorage.getItem("talkGPTapiKey");

if (api_key) {
	check_key(api_key);
} 

function validateKey() {
	const key = key_input.value;

	closeApiWindow();

	key_input.value = "";

	check_key(key);
}

function check_key(key) {
	loading.classList.remove("hidden");
	micButtonEnable(false);

	const dados = {
		model: "text-ada-001",
		prompt: "test",
		max_tokens: 1,
		n: 1,
	};

	const urlencoded = new URLSearchParams();
	urlencoded.append("dados", JSON.stringify(dados));
	urlencoded.append("apikey", api_key);



	let fetchdata = {
		method: "POST",
		body: urlencoded,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	};

	fetch("src/php/validate.php",fetchdata)
		.then((response) => response.json())
		.then((data) => {
			loading.classList.add("hidden");
			const parse = JSON.parse(data);

			console.log(data)

			if (!parse["error"]) {
				//validation_button.classList.add("bg-green-400");

				micButtonEnable(true);

				api_key = key;

				if (checkbox.checked) {
					localStorage.setItem("talkGPTapiKey", key);
				}
			} else {
				//validation_button.classList.remove("bg-green-400");

				micButtonEnable(false);
			}
		});
}

function remember(e) {
	localStorage.setItem("checkbox", e.checked);
}

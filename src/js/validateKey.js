micButtonToggle(false);

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
} else {
	check_key("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");
}

function validateKey() {
	const key = key_input.value;

	closeApiWindow();

	key_input.value = "";

	check_key(key);
}

function check_key(key) {
	loading.classList.remove("hidden");
	micButtonToggle(false);

	fetch("https://api.openai.com/v1/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`,
		},
		body: JSON.stringify({
			model: "text-ada-001",
			prompt: "test",
			max_tokens: 1,
			n: 1,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			loading.classList.add("hidden");

			if (!data["error"]) {
				validation_button.classList.add("bg-green-400");

				micButtonToggle(true);

				api_key = key;

				if (checkbox.checked) {
					localStorage.setItem("talkGPTapiKey", key);
				}
			} else {
				validation_button.classList.remove("bg-green-400");

				micButtonToggle(false);
			}
		});
}

function remember(e) {
	localStorage.setItem("checkbox", e.checked);
}

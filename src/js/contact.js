const cta = document.getElementById("cta");
const sucessnotification = document.getElementById("sucessnotification");
const failnotification = document.getElementById("failnotification");

cta.addEventListener("click", (event) => {
	let email = document.getElementById("email").value;
	let name = document.getElementById("name").value;
	console.log("clicou");
	event.preventDefault();
	console.log(name);
	let mcData = {
		members: [
			{
				email_address: email,
				merge_fields: {
					FNAME: name,
				},
				status: "subscribed",
			},
		],
	};
    let mcDatapost = JSON.stringify(mcData);
    let options = {
		url: "https://us11.api.mailchimp.com/3.0/lists/825c31743f",
		method: "POST",
		headers: {
			Authorization: '2d43db49313c54b1907a590e0d5e7211-us11',
		},
		body: mcDatapost,
	};

	fetch("/", options).then((res) => {
		if (res.ok) {
			sucessnotification.classList.remove("opacity-0");
			console.log("funcinou");
		} else {
			failnotification.classList.remove("opacity-0");
		}
	});
});

const closefail = document.getElementById("closefail");

closefail.addEventListener("click", (event) => {
	failnotification.classList.add("opacity-0");
});
const closesucess = document.getElementById("closesuccess");

closesucess.addEventListener("click", (event) => {
	sucessnotification.classList.add("opacity-0");
});

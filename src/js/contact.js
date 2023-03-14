// contact to php and send to mailchimp
const cta = document.getElementById("cta");

const sucessnotification = document.getElementById("sucessnotification");
const failnotification = document.getElementById("failnotification");

cta.addEventListener("click", (event) => {
	const email = document.getElementById("email").value;
	const name = document.getElementById("name").value;
	const body = { email: email, name: name };

	event.preventDefault();
	const urlencoded = new URLSearchParams();
	urlencoded.append("name", name);
	urlencoded.append("email", email);

	let fetchdata = {
		method: "POST",
		body: urlencoded,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	};

	fetch("src/php/contact.php", fetchdata)
		.then((response) => response.json())
		.then((data) => {
			const parse = JSON.parse(data);
			if (parse["error"]) {
				sucessnotification.classList.remove("hidden");
				console.log("funcinou");
			} else {
				failnotification.classList.remove("hidden");
			}
		})
		.catch((error) => console.log("error", error));
});

const closefail = document.getElementById("closefail");

closefail.addEventListener("click", (event) => {
	failnotification.classList.add("hidden");
});
const closesucess = document.getElementById("closesuccess");

closesucess.addEventListener("click", (event) => {
	sucessnotification.classList.add("hidden");
});

const cta = document.getElementById("cta");
const sucessnotification = document.getElementById("sucessnotification");
const failnotification = document.getElementById("failnotification");

cta.addEventListener("click",(event) =>{
	const email=document.getElementById("email").value;
	const name=document.getElementById("name").value;
	console.log("clicou");
	event.preventDefault();
	console.log(name)
	let fetchdata={
	  method :'POST',
	  body:JSON.stringify({email:this.email.value,name:this.name.value}),
	  headers:{"Content-Type":"application/json"}
	}
	fetch("/php/contact.php",fetchdata).then(res =>{
	  if(res.ok){   
		sucessnotification.classList.remove("opacity-0");
		console.log("funcinou")
	  }else{
		failnotification.classList.remove("opacity-0");
	  }
	})
  }
  );
const closefail = document.getElementById("closefail");

closefail.addEventListener("click", (event) => {
	failnotification.classList.add("opacity-0");
});
const closesucess = document.getElementById("closesuccess");

closesucess.addEventListener("click", (event) => {
	sucessnotification.classList.add("opacity-0");
});

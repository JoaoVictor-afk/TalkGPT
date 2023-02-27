const cta = document.getElementById("cta");
const sucessnotification = document.getElementById("sucessnotification");
const failnotification = document.getElementById("failnotification");

cta.addEventListener("click",(event) =>{
	const email=document.getElementById("email").value;
	const name=document.getElementById("name").value;
	
	event.preventDefault();
	
	let fetchdata={
	  method : 'POST',
	  body : JSON.stringify({email:this.email,name:this.name}),
	  headers : {"Content-Type":"application/json"}
	}
	fetch("src/php/contact.php",fetchdata).then(res =>{
	  if(res.ok){   
		sucessnotification.classList.remove("hidden");
		console.log("funcinou")
	  }else{
		failnotification.classList.remove("hidden");
	  }
	})
  }
  );
const closefail = document.getElementById("closefail");

closefail.addEventListener("click", (event) => {
	failnotification.classList.add("hidden");
});
const closesucess = document.getElementById("closesuccess");

closesucess.addEventListener("click", (event) => {
	sucessnotification.classList.add("hidden");
});

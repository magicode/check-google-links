
document.querySelector('#etrog_fix_email').value = localStorage["etrog_fix_email"] ? localStorage["etrog_fix_email"] : "";


document.querySelector('#etrog_fix_email').addEventListener("keyup",function(){
	localStorage["etrog_fix_email"] = this.value;
});
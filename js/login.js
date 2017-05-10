var login = {
	loggedIn: false,
	login: function login(username,password){
		console.log(username + ": " + password);
		this.loggedIn = true;
	},
	logout: function logout(){
		this.loggedIn = false;
		window.location.href = "../index.html";
	}
}
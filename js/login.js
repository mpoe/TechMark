var login = {
	loggedIn: false,
	login: function login(username,password){
		$.getJSON('../data/users.txt', function(oData) {
			var oUser = oData.find(function(u) { return u.sUsername == username && u.sPassword == password });
			if(typeof oUser == "undefined")
				window.location.href = "login.html";
			else {
				//Sign in the User
				$.get('api/login.php?id=' +oUser.sID, function() {
					window.location.href = "admin.html";
				});
			}
		});
		this.loggedIn = true;
	},
	logout: function logout(){
		this.loggedIn = false;
		window.location.href = "login.html";
	}
}
$(document).on('click', '#btn-login-user', function(e) {
	e.preventDefault();
	login.login($('input[name="username"]').val(), $('input[name="password"]').val());
});

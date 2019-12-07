class loginPage{
	constructor(login = '', password = '', dataContainer = new FormData(), user_type = 'administrator', error = '', preloader = '') {
		this.login = login;
		this.password = password;
		this.dataContainer = dataContainer;
		this.user_type = user_type;
		this.error = error;
		this.preloader = preloader;
	}

	authLog(obj){
		let preloader = document.querySelector('.preloader-container');
		preloader.style.display = 'flex';
		this.dataContainer.append('username',obj.username)
		this.dataContainer.append('password', obj.password)
		this.dataContainer.append('user_type', this.user_type)
		axios.post('http://192.168.1.118/auth/signin', this.dataContainer).then(response => {
			preloader.style.display = 'none';
			console.log(response.data.ok)
			if (response.data.ok === true) {
				window.location.href = response.data.message;
			}
			else {
				this.errFunc(response.data.message);
			}
		})
	} 

	errFunc(err){
		var errorBlock = document.querySelector('.login-page__form-error');
		errorBlock.style.display = 'block';
		var errorText = document.querySelector('#err').textContent = err;
	}
}


const enterBtn = document.querySelector('#enterBtn');
enterBtn.addEventListener('click', () => {
	var callPage = new loginPage();
	var validate = {
		'username' : document.querySelector('#login').value,
		'password' : document.querySelector('#password').value
	}
	callPage.authLog(validate);
})
window.addEventListener('keyup', (e) => {
	if (e.key === 'Enter'){
		var callPage = new loginPage();
		var validate = {
			'username' : document.querySelector('#login').value,
			'password' : document.querySelector('#password').value
		}
		callPage.authLog(validate);
	}
})


var activeLink = document.querySelectorAll('.icons-link');
for (var i = 0; i < activeLink.length; i++) {
	activeLink[i].onclick = function () {
		for (var j = 0; j < activeLink.length; j++) {
			activeLink[j].classList.remove('active-icon');
		}
		this.classList.toggle('active-icon');
		console.log(this.title)
	}
}


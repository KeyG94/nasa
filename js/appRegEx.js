const form = document.getElementById('form');
const name = document.getElementById('firstname');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const mailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	validateForm();

	if (validateForm === true) {
		name.value = '';
		name.placeholder = 'Firstname';
		surname.value = '';
		surname.placeholder = 'Surname';
		email.value = '';
		email.placeholder = 'e-mail e.g. jon.doe@gmail.co';
		phone.value = '';
		phone.placeholder = 'phone number e.g. +4747805030';
		message.value = '';
		message.placeholder = 'Your message...';
	}
});

function validateForm() {
	//get values from the inputs
	//make sure accidental whitespace is removed
	const nameValue = name.value.trim();
	const surnameValue = surname.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.trim();
	const messageValue = message.value;

	//is Name empty
	if (!nameValue) {
		//show error
		setError(name, 'Name cannot be blank!!');
	} else if (!isName(nameValue)) {
		//show error in placeholder
		name.value = '';
		setError(name, 'please write a valid name: E.g. Jon');
	} else {
		//add success
		setSuccess(name);
	}

	//is surname empty
	if (!surnameValue) {
		//show error
		setError(surname, 'Surname cannot be blank!!');
	} else if (!isName(surnameValue)) {
		surname.value = '';
		setError(surname, 'please write a valid name: E.g. Doe');
	} else {
		//success
		setSuccess(surname);
	}

	//is email empty
	if (!emailValue) {
		//show error
		setError(email, 'e-mail cannot be blank!!');
	} else if (!isMail(emailValue)) {
		//show error in placeholder
		email.value = '';
		setError(email, 'Invalid email, e.g. jon.doe@gmail.com');
	} else {
		//add success
		setSuccess(email);
	}

	//is phone number empty
	if (!phoneValue) {
		//show error
		setError(phone, 'Phone number cannot be blank!!');
	} else if (!isNumber(phoneValue)) {
		//show error in placeholder
		phone.value = '';
		setError(phone, '"phone number e.g. +4747805030');
	} else {
		setSuccess(phone);
	}

	//is textarea empty
	if (!messageValue) {
		//show error
		setError(message, 'Please write a message text, minimum 5 letters!');
	} else if (messageValue > 5) {
		//show error
		alert('please write a message longer than 5 letters');
	} else {
		setSuccess(message);
	}

	if (messageValue && phoneValue && emailValue && surnameValue && nameValue) {
		console.log(true);
		alert('Thanks for your submission ' + name.value);
		name.value = '';
		surname.value = '';
		email.value = '';
		phone.value = '';
		message.value = '';

		return true;
	}
}

function setError(input, message) {
	const formCheck = input;

	//add error message
	formCheck.className = 'contact-form-text error';

	input.placeholder = message;
}

function setSuccess(input) {
	const formCheck = input;
	formCheck.className = 'contact-form-text success';
}

function isName(name) {
	return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
		name
	);
}

function isMail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNumber(num) {
	return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(num);
}

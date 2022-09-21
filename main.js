// 7. Регистрация пользователей, создать форму в которой будем запрашивать информацию о пользователе(имя, пароль, возраст, имя может быть не уникальным, но у каждого должен быть айди, также при сохранении объекта пользователя добавляется ключ mailing со значением false - это рассылка новостей), также реализовать вывод пользователей на страницу(вывод может быть в любом удобном виде), напротив каждого пользователя должен быть инпут с типом чекбокс, как раз он и будет отвечать за рассылку, изменяется инпут - изменяется значение ключа mailing, также должна быть сама функция рассылки(на странице должна быть кнопка по нажатию на которую и будет запускаться функция), которая будет отправлять сообщение только тем пользователям, которые подписаны на рассылку(вывод может быть любым, алерт, консоль, страница), учесть, что всех пользователей необходимо хранить в local Storage

function initStorage() {
	if (!localStorage.getItem('users-data')) {
		localStorage.setItem('users-data', '[]')
	}
}
// localStorage.clear()
initStorage()

function setProductStorage(users) {
	localStorage.setItem('users-data', JSON.stringify(users))
}

function getProductFromStorage() {
	let users = JSON.parse(localStorage.getItem('users-data'))
	return users
}
let container = document.querySelector('.container')

function render(data = getProductFromStorage()) {
	container.innerHTML = ''

	data.forEach((item, index) => {
		container.innerHTML += ` <li id = '${index + 1}'> ID: ${index + 1} Name: ${
			item.name
		}; Age:${item.age}; Password ${item.password}; Mailing: ${item.mailing} ${
			item.input
		} <br>`
	})

	addCheckEvent()
}
render()

// let check = document.querySelectorAll('#check')
function createProduct() {
	let nameInp = document.querySelector('#user-name-inp')
	let ageInp = document.querySelector('#user-age-inp')
	let passInp = document.querySelector('#user-password-inp')

	if (!nameInp.value.trim() || !ageInp.value.trim() || !passInp.value.trim()) {
		alert('Some inputs are empty')
		return
	}

	let usersObj = {
		name: nameInp.value,
		age: ageInp.value,
		password: passInp.value,
		mailing: false,
		message: [],
		input: `<input class="form-check-input checkInp" id="check" type="checkbox">`,
	}

	let data = getProductFromStorage()
	data.push(usersObj)
	setProductStorage(data)

	nameInp.value = ''
	ageInp.value = ''
	passInp.value = ''

	render()
}

function checkFunc(e) {
	let data = getProductFromStorage()
	let product = e.target.parentNode.id
	data.forEach((item, index) => {
		if (index + 1 == product && item.mailing === false) {
			item.mailing = true
			item.input = `<input class="form-check-input checkInp" id="check" type="checkbox" checked>`
		} else if (index + 1 == product && item.mailing === true) {
			item.mailing = false
			item.input = `<input class="form-check-input checkInp" id="check" type="checkbox">`
		}
	})
	setProductStorage(data)
	render()
}
function addCheckEvent() {
	let check = document.querySelectorAll('#check')
	check.forEach((item) => {
		item.addEventListener('click', checkFunc)
	})
}

let addUserBtn = document.querySelector('#add-user-btn')
addUserBtn.addEventListener('click', createProduct)
let send = document.querySelector('.send-btn')
send.addEventListener('click', () => {
	let data = getProductFromStorage()
	let messege = prompt('Enter message')
	data.forEach((item) => {
		if (item.mailing == true) {
			item.message = messege
		}
	})
	for (let i = 0; i < data.length; i++) console.log(data[i])
})

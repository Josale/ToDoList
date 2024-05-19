'use strict'

let counter = 0

function handleKeyPress(event) {
	const inputField = document.getElementById('newToDo')
	if (event.key === 'Enter') {
		let inputInfo = inputField.value
		inputField.value = ''
		console.log(inputInfo)
		hideDescription(event)
		addToDoItem(inputInfo)
		itemsCounter(counter)
	}
}

function addToDoItem(inputInfo) {
	if (inputInfo !== '') {
		const listInput = document.createElement('input')
		listInput.id = `input-checkbox${counter}`

		if (counter >= 6) {
			return
		} else {
			counter++
		}

		listInput.className = 'input-checkbox'
		listInput.type = 'checkbox'

		const image = document.createElement('img')
		image.src = 'img/trash.svg'
		image.className = 'trash'

		const labelInput = document.createElement('label')
		labelInput.className = 'input-label'
		labelInput.htmlFor = listInput.id
		labelInput.innerText = inputInfo

		const items = document.querySelector('.todo-items')

		items.append(listInput)
		items.append(labelInput)
		labelInput.append(image)

		image.addEventListener('click', function (event) {
			event.stopPropagation()
			deleteToDoItem(labelInput, listInput)
		})
	} else {
		console.log('empty')
	}
}

function deleteToDoItem(labelInput, listInput) {
	labelInput.remove()
	listInput.remove()
	counter--
	itemsCounter(counter)
	if (counter == 0) {
		description.classList.remove('hide')
	}
}

function itemsCounter(counter) {
	const infoTodo = document.querySelector('.todo-info')
	let itemsCount = infoTodo.querySelector('.items-count')

	if (itemsCount) {
		itemsCount.innerText = `${counter} items`
	} else {
		itemsCount = document.createElement('p')
		itemsCount.className = 'items-count'
		itemsCount.innerText = `${counter} items`
		infoTodo.append(itemsCount)
	}
}

itemsCounter(counter)

const description = document.querySelector('.todo-description')

function hideDescription(event) {
	if (event.key == 'Enter') {
		description.classList.add('hide')
	}
}

function buttonAdd() {
	const button = document.getElementById('addToDo')
	const inputField = document.getElementById('newToDo')
	button.addEventListener('click', () => {
		if (inputField.value.trim() !== '') {
			let inputInfo = inputField.value
			description.classList.add('hide')
			addToDoItem(inputInfo)
			itemsCounter(counter)
		} else {
			console.log('Type something')
		}
	})
}

buttonAdd()

// function addCompleted() {
// 	const checkbox = document.querySelector('');
// 	if(input[type='checkbox']:checked)
// }

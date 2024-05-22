'use strict';

let counter = 0;
let counterCompleted = 0;

function handleKeyPress(event) {
	const inputField = document.getElementById('newToDo');
	if (event.key === 'Enter') {
		let inputInfo = inputField.value;
		inputField.value = '';
		addToDoItem(inputInfo);
	}
}

function addToDoItem(inputInfo) {
	if (inputInfo !== '') {

		if(counter >= 0) {
			counter ++;
		}

		const listInput = document.createElement('input');
		listInput.id = `input-checkbox${counter}`;
		listInput.className = 'input-checkbox';
		listInput.type = 'checkbox';

		const image = document.createElement('img');
		image.src = 'img/trash.svg';
		image.className = 'trash';

		const labelInput = document.createElement('label');
		labelInput.className = 'input-label';
		labelInput.htmlFor = listInput.id;
		labelInput.innerText = inputInfo;

		const items = document.querySelector('.todo-items');
		items.append(listInput);
		items.append(labelInput);
		labelInput.append(image);

		setupCheckboxListeners();

		image.addEventListener('click', function (event) {
			event.stopPropagation();
			deleteToDoItem(labelInput, listInput);
		});

		itemsCounter(counter);
		hideDescription();
	} else {
		console.log('empty');
	}
}

function deleteToDoItem(labelInput, listInput) {
	const isCompleted = labelInput.classList.contains('completed');
	labelInput.remove();
	listInput.remove();
	if (isCompleted) {
			counterCompleted--;
			if(counterCompleted < 0) counterCompleted = 0;
			itemsCounterCompleted();
	} else {
		counter--;
		if(counter < 0) counter = 0;
		itemsCounter()
		if (counter === 0) {
			showDescription();
		}
	}

	itemsCounter();
	if (counter === 0) {
		showDescription();
	}
}

function itemsCounter() {
	const infoTodo = document.querySelector('.todo-info');
	let itemsCount = infoTodo.querySelector('.items-count');

	if (itemsCount) {
		itemsCount.innerText = `${counter} items`;
	} else {
		itemsCount = document.createElement('p');
		itemsCount.className = 'items-count';
		itemsCount.innerText = `${counter} items`;
		infoTodo.append(itemsCount);
	}
}

function itemsCounterCompleted() {
	const infoTodoCompleted = document.querySelector('.todo-info-completed');
    let itemsCountCompleted = infoTodoCompleted.querySelector('.items-count');

    if (itemsCountCompleted) {
        itemsCountCompleted.innerText = `${counterCompleted} items`;
    } else {
        itemsCountCompleted = document.createElement('p');
        itemsCountCompleted.className = 'items-count';
        itemsCountCompleted.innerText = `${counterCompleted} items`;
        infoTodoCompleted.append(itemsCountCompleted);
	}
}

itemsCounter();
itemsCounterCompleted();

const description = document.querySelector('.todo-description');

function hideDescription() {
	if (counter > 0) {
		description.classList.add('hide');
	}
}

function showDescription() {
	if (counter === 0) {
		description.classList.remove('hide');
	}
}

function buttonAdd() {
	const button = document.getElementById('addToDo');
	const inputField = document.getElementById('newToDo');
	button.addEventListener('click', () => {
		if (inputField.value.trim() !== '') {
			let inputInfo = inputField.value;
			inputField.value = '';
			addToDoItem(inputInfo);
		} else {
			console.log('Type something');
		}
	});
}

buttonAdd();

function addToCompleted(label) {
	const completedList = document.querySelector('.todo-items-completed');
    const todoItems = document.querySelector('.todo-items');
    const checkbox = label.previousElementSibling;

    if (label.classList.contains('completed')) {
        completedList.append(checkbox);
        completedList.append(label);
        counter--;
        counterCompleted++;
    } else {
        todoItems.append(checkbox);
        todoItems.append(label);
        counter++;
        counterCompleted--;
    }

    if (counter < 0) counter = 0;
    if (counterCompleted < 0) counterCompleted = 0;

    itemsCounter();
    itemsCounterCompleted();
}

function toggleCompletion(event) {
	const checkbox = event.target;
	const label = document.querySelector(`label[for="${checkbox.id}"]`);
	if (checkbox.checked) {
		label.classList.add('completed');
	} else {
		label.classList.remove('completed');
	}
	addToCompleted(label);
}

function setupCheckboxListeners() {
	document.querySelectorAll('.input-checkbox').forEach(checkbox => {
		checkbox.addEventListener('change', toggleCompletion);
	});
}

'use strict'

let counter = 0;

function handleKeyPress(event) {
	const inputField = document.getElementById('newToDo');
	if (event.key === 'Enter') {
			let inputInfo = inputField.value;
			inputField.value = '';		
			console.log(inputInfo)
			addToDoItem(inputInfo)
			itemsCounter(counter)
	}
}

function addToDoItem(inputInfo) {
	if(inputInfo !== '') {
	const listInput = document.createElement('input');
	listInput.id = `input-checkbox${counter}`;

	if(counter >= 6) {
		return
	} else {
		counter++;
	}
	
	listInput.className = 'input-checkbox';
	listInput.type = 'checkbox';

	const labelInput = document.createElement('label');
	labelInput.className = 'input-label';
	labelInput.htmlFor = listInput.id;
	labelInput.innerText = inputInfo;

	const items = document.querySelector('.todo-items');
	
	items.append(listInput);
	items.append(labelInput);
	} else {
		console.log('empty')
	}
}

function itemsCounter(counter) {
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

itemsCounter(counter)

// some changes
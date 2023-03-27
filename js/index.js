let url = "http://localhost:3000/monsters"
let pageCounter = 1;

function fetchMonsters() {
    fetch(url + `/?_limit=50&_page=${pageCounter}`)
    .then(resp => resp.json())
    .then((data) => renderMonsters(data));
};

fetchMonsters();

let monsterContainer = document.getElementById('monster-container');
let monsterFormContainer = document.getElementById('create-monster')

function renderMonsters(monsters) {
    monsters.forEach(monster => {
        let name = document.createElement('h1');
        name.textContent = monster.name;

        let age = document.createElement('p');
        age.textContent = `Age: ${monster.age}`;

        let desc = document.createElement('p');
        desc.textContent = `Description: ${monster.description}`;
        
        monsterContainer.append(name, age, desc);

    })
};

let form = document.createElement('form');
let nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.name = 'name';
nameInput.placeholder = 'Name'

let ageInput = document.createElement('input');
ageInput.type = 'text';
ageInput.name = 'age';
ageInput.placeholder = 'age'


let description = document.createElement('input');
description.type = "text";
description.name = "description"
description.placeholder = 'Description'

let submit = document.createElement('input');
submit.type = 'submit';

form.append(nameInput, ageInput, description, submit);
monsterFormContainer.append(form);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let monster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value,
    };
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(monster),
    })
    .then(resp => resp.json())
    .then(data => renderMonsters([monster]));

    console.log(monster)
});

let forward = document.getElementById('forward');
forward.addEventListener('click', () => {
    pageCounter++
    monsterContainer.innerHTML = "";
    fetchMonsters();
})

let back = document.getElementById('back');
back.addEventListener('click', () => {
    if (pageCounter === 0) {
        pageCounter = 1;
    } else {
        pageCounter--
    };
    monsterContainer.innerHTML = "";
    fetchMonsters();
});
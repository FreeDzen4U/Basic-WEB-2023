const list = document.getElementById('listUsers')

function addUsers() {
    fetch("https://randomuser.me/api/?results=2")
        .then((results) => {
            return results.json();
        })
        .then((response) => {
            const user = response.results[0];
            const person = new Person(
                user.picture,
                user.name,
                user.cell,
                user.location.city,
                user.location.country);    
            person.listUsers();
        });
}

function removeUsers() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}

class Person {
    constructor(picture, name, cell, city, country) {
        this.picture = picture;
        this.name = name;
        this.cell = cell;
        this.city = city;
        this.country = country;
    }

    listUsers() {
        const user = document.createElement('div');
        user.id = 'user';

        const picture = document.createElement('img');
        picture.src = this.picture.medium;
        user.appendChild(picture);

        const name = document.createElement('span');     
        name.innerHTML = `Name: <em>${this.name.title} ${this.name.first} ${this.name.last}</em>`
        user.appendChild(name);

        const cell = document.createElement('span');
        cell.innerHTML = `Cell: <em>${this.cell}</em>`
        user.appendChild(cell);

        const city = document.createElement('span');
        city.innerHTML = `City: <em>${this.city}</em>`;
        user.appendChild(city);

        const country = document.createElement('span');
        country.innerHTML = `Country: <em>${this.country}</em>`;
        user.appendChild(country);

        list.appendChild(user);

        console.log(this.picture, this.name, this.cell, this.city, this.country);
    }
}
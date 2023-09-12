let validator = 1;
let errors = [];
let answers = [];
const answerDiv = document.createElement('div');
const main_box = document.getElementById('main_box');

function clearData() {
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
    if (main_box.contains(answerDiv)) main_box.removeChild(answerDiv);
    errors.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '2px red solid';
    });
    validator = 1;
    errors = [];
    answers = [];
}

function validInfo(type, text, regex, additionalCheck = () => true) {
    const valueFromElement = document.getElementById(type).value;
    const field = document.getElementById(type);
    if (regex.test(valueFromElement) && additionalCheck(valueFromElement)) {
        const answer = document.createElement('h4');
        answer.innerHTML = `${text}: ` + valueFromElement;
        answers.push(answer);

        field.style.border = '2px green solid';
    } else {
        validator = 0;
        errors.push(type);

        field.style.border = '2px red solid';
    }
}

function valid() {
    clearData();
    validInfo('name', 'ПІБ', /^[A-ZА-ЯІ][a-zA-ZА-ЯІа-яі]+ [A-ZА-ЯІ]\. [A-ZА-ЯІ]\.$/);
    validInfo('variant', 'Варіант', /^\d{2}$/);
    validInfo('group', 'Група', /^[A-ZА-ЯІ]{2}-\d{2}$/);
    validInfo('number', 'Телефон', /^\d{3}-\d{3}-\d{2}-\d{2}$/);
    validInfo('idCard', 'ID-card', /^[A-ZА-ЯІ]{2} №\d{6}$/);

    if (validator) {
        answers.forEach(answer => answerDiv.appendChild(answer));
        main_box.appendChild(answerDiv);
    } else {
        errors.forEach(errorField => {
            const field = document.getElementById(errorField);
            field.style.border = '2px red solid';
        });
    }
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

function ranColorForCell(cell) {
    cell.style.backgroundColor = randomColor();
}

function currColor(cell) {
    const tool = document.getElementById('tool');
    cell.style.backgroundColor = tool.value;
}

function dbclickToChange() {
    for (let j = 1; j <= 6; j++) {
        document.getElementById(j).style.backgroundColor = tool.value;
    }
}

function createTable() {
    const container = document.getElementById("sec_box");
    const table = document.createElement('table');

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            const value = i * 6 + j + 1;
            cell.innerHTML = value;
            cell.id = value;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);

    const option = 1;
    const my_cell = document.getElementById(option);
    my_cell.addEventListener('mouseover', () => ranColorForCell(my_cell));
    my_cell.addEventListener('click', () => currColor(my_cell));
    my_cell.addEventListener('dblclick', dbclickToChange);
}

createTable();
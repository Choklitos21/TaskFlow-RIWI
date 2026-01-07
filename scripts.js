let listOfTasks = []

function loadTasks() {
    // Obtener los datos del localStorage
    const localStorageData = localStorage.getItem('listOfTasks');

    if (localStorageData) { // Verificar si existen datos
        const data = JSON.parse(localStorageData); // Convertir JSON a objeto
        const taskList = document.getElementById('cards-container')

        for (let i= 0; i < data.length; i++) {
            const newTask = document.createElement('div')
            newTask.innerHTML = '<div class="card" id="task' + i + '">\n' +
                '                <strong class="title">' + data.title + '</strong>\n' +
                '                <span class="priority">' + data.priority + '</span>\n' +
                '                <select name="status" class="status-select">' +
                '                 <option value="' + data.status + '" selected>' + data.status + '</option>' +
                '                 <option value="In process">In process</option>'+
                '                 <option value="Pending">Pending</option>'+
                '                 <option value="Completed">Completed</option>'+
                '                 </select>' +
                '                <p>' + data.description + '</p>\n' +
                '                <button class="delete-btn">Delete</button>\n' +
                '            </div>'

            taskList.appendChild(newTask)
        }
    }
}

window.onload = loadTasks;

document.getElementById('form').addEventListener('submit', function(event) {
    // 1. Prevenir el envío por defecto
    event.preventDefault();

    // 2. Crear un objeto FormData para obtener todos los datos
    const formData = new FormData(this); // 'this' se refiere al formulario

    // 3. Obtener valores específicos
    const title = formData.get('title');
    const description = formData.get('description');
    const priority = formData.get('priority');
    const status = 'In process'

    if (!title) {
        alert("Insert a title name")
        return false
    } else if (!description) {
        alert("Insert a description")
        return false
    } else if (priority === "#") {
        alert("Choose a priority")
        return false
    }

    const taskList = document.getElementById('cards-container')
    let taskNumbers = taskList.children.length

    const newTask = document.createElement('div')
    newTask.innerHTML = '<div class="card" id="task' + taskNumbers + '">\n' +
        '                <strong class="title">' + title + '</strong>\n' +
        '                <span class="priority">' + priority + '</span>\n' +
        '                <select name="status" class="status-select">' +
        '                 <option value="' + status + '" selected>' + status + '</option>' +
        '                 <option value="In process">In process</option>'+
        '                 <option value="Pending">Pending</option>'+
        '                 <option value="Completed">Completed</option>'+
        '                 </select>' +
        '                <p>' + description + '</p>\n' +
        '                <button class="delete-btn">Delete</button>\n' +
        '            </div>'

    taskList.appendChild(newTask)
    this.reset();

    listOfTasks.push(
        {
            title: title,
            description: description,
            priority: priority,
            status: status
        }
    )
    console.log(listOfTasks)
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

});



const cardsContainer = document.getElementById('cards-container');

cardsContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains("status-select")){
        updateTaskStatus(event.target);
    }
});

function updateTaskStatus(select){
    const card = select.closest('.card');
    const newStatus = select.value;

    card.setAttribute('data-status', newStatus);
}


cardsContainer.addEventListener('click',(event)=>{
    if (event.target.classList.contains("delete-btn")){
        deleteTask(event.target);
    }
});

function deleteTask(button){
    const card = button.closest('.card');
    card.remove();
}

function renderTasks(){
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    let filteredTasks = tasks;

    if (activeFilter !== 'Completed') {
        filteredTasks = tasks.filter(task => task.status === "Completed");
    }
    if (activeFilter === 'Pending'){
        filteredTasks = tasks.filter(task => task.status === "Pending");
    }

    if (activeFilter === 'In process'){
        filteredTasks = tasks.filter(task => task.status === "In process");

    }

    if (activeFilter === 'High'){
        filteredTasks = tasks.filter(task => task.status === "High");

    }

    if (activeFilter === 'Medium'){
        filteredTasks = tasks.filter(task => task.status === "Medium");

    }
    if (activeFilter === 'Low'){
        filteredTasks = tasks.filter(task => task.status === "Low");

    }

    filteredTasks.forEach(task =>{
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = task.id;
        card.dataset.status = task.status;

        card.innerHTML = '<div class="card" id="task' + taskNumbers + '">\n' +
        '                <strong class="title">' + title + '</strong>\n' +
        '                <span class="priority">' + priority + '</span>\n' +
        '                <select name="status" class="status-select">' +
        '                 <option value="' + status + '" selected>' + status + '</option>' +
        '                 <option value="In process">In process</option>'+
        '                 <option value="Pending">Pending</option>'+
        '                 <option value="Completed">Completed</option>'+
        '                 </select>' +
        '                <p>' + description + '</p>\n' +
        '                <button class="delete-btn">Delete</button>\n' +
        '            </div>'
        container.appendChild(card);

}
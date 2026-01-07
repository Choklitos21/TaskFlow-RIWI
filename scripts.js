

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



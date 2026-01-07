

document.getElementById('form').addEventListener('submit', function(event) {
    // 1. Prevenir el envío por defecto
    event.preventDefault();

    // 2. Crear un objeto FormData para obtener todos los datos
    const formData = new FormData(this); // 'this' se refiere al formulario

    // 3. Obtener valores específicos
    const title = formData.get('title');
    const description = formData.get('description');
    const priority = formData.get('priority');
    const status = 'in process'

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

    const newTask = document.createElement('div')
    newTask.innerHTML = '<div class="card">\n' +
        '                <strong class="title">' + title + '</strong>\n' +
        '                <span class="priority">' + priority + '</span>\n' +
        '                <select name="status" id="status">' +
        '                 <option value="#" selected>' + status + '</option>' +
        '                 <option value="#" selected>High</option>'+
        '                 <option value="#" selected>Medium</option>'+
        '                 <option value="#" selected>Low</option>'+
        '                 </select>' +
        '                <p>' + description + '</p>\n' +
        '                <button id="delete">Delete</button>\n' +
        '            </div>'

    taskList.appendChild(newTask)
    this.reset();

});

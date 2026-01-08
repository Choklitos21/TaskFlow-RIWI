let listOfTasks = []
let activeFilter = 'ALL';

function loadTasks() {
    // Obtener los datos del localStorage
    const localStorageData = localStorage.getItem('listOfTasks');

    if (localStorageData) { // Verificar si existen datos
        listOfTasks = JSON.parse(localStorageData);
        renderTasks(listOfTasks) ;// Convertir JSON a objeto
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


    listOfTasks.push(
        {
            title,
            description,
            priority,
            status
        }
    )
    console.log(listOfTasks)
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    applyFilter();
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
    const index = card.dataset.index;
    const newStatus = select.value;

    listOfTasks[index].status = newStatus;
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    applyFilter();
}


cardsContainer.addEventListener('click',(event)=>{
    if (event.target.classList.contains("delete-btn")){
        deleteTask(event.target);
    }
});

function deleteTask(button){
    const card = button.closest('.card');
    const index = card.dataset.index;

    listOfTasks.splice(index,1);
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    applyFilter();
}

function renderTasks(TasksToRender){
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    TasksToRender.forEach((task,index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.status = task.status;
        card.innerHTML = `
            <strong class="title">${task.title}</strong>
            <span class="priority">${task.priority}</span>

            <select class="status-select">
                <option value="In process" ${task.status === "In process" ? "selected" : ""}>In process</option>
                <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>

            <p>${task.description}</p>
            <button class="delete-btn">Delete</button>
        `;

        container.appendChild(card);
    });


}
function applyFilter() {
    let filteredTasks = listOfTasks;

    if (activeFilter === "COMPLETED") {
        filteredTasks = listOfTasks.filter(task => task.status === "Completed");
    }

    if (activeFilter === "PENDING") {
        filteredTasks = listOfTasks.filter(task => task.status === "Pending");
    }

    if (activeFilter === "HIGH") {
        filteredTasks = listOfTasks.filter(task => task.priority === "High");
    }

    if (activeFilter === "MEDIUM") {
        filteredTasks = listOfTasks.filter(task => task.priority === "Medium");
    }

    if (activeFilter === "LOW") {
        filteredTasks = listOfTasks.filter(task => task.priority === "Low");
    }

    renderTasks(filteredTasks);

}    

const filterSelect = document.getElementById('filter-select');

filterSelect.addEventListener('change', (event) => {
    activeFilter = event.target.value;
    applyFilter();
});

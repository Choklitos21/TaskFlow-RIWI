let listOfTasks = []
let activeFilter = 'ALL';

function loadTasks() {
  const localStorageData = localStorage.getItem('listOfTasks');

  if (localStorageData) {
    listOfTasks = JSON.parse(localStorageData);

    
    listOfTasks = listOfTasks.map(t => t.id ? t : { ...t, id: Date.now().toString() + Math.random() });
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));

    applyFilter(); 
  }
}

window.onload = loadTasks;

document.getElementById('form').addEventListener('submit', function(event) {
    // 1. Prevenir el envío por defecto
    event.preventDefault();

    // 2. Crear un objeto FormData para obtener todos los datos
    const formData = new FormData(this);

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


    listOfTasks.push({
        id: Date.now().toString(),   
        title,
        description,
        priority,
        status
    });

    console.log(listOfTasks)
    localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
    applyFilter();
    this.reset();

});



const cardsContainer = document.getElementById('cards-container');

    cardsContainer.addEventListener("click", (event) => {
    const btn = event.target.closest(".status-btn");
    const item = event.target.closest(".status-item");

    // abrir/cerrar menu
    if (btn) {
        const dd = btn.closest(".status-dd");
        const menu = dd.querySelector(".status-menu");
        const isOpen = !menu.hidden;

        // cerrar otros dropdowns abiertos
        document.querySelectorAll(".status-menu").forEach(m => m.hidden = true);

        menu.hidden = isOpen;
        btn.setAttribute("aria-expanded", String(!isOpen));
        return;
    }

    // seleccionar status
    if (item) {
        const dd = item.closest(".status-dd");
        const id = dd.dataset.id;
        const newStatus = item.dataset.status;

        const taskIndex = listOfTasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return;

        listOfTasks[taskIndex].status = newStatus;
        localStorage.setItem("listOfTasks", JSON.stringify(listOfTasks));
        applyFilter(); // re-render
        return;
    }
    });

    // click fuera: cerrar menus
    document.addEventListener("click", (e) => {
    if (!e.target.closest(".status-dd")) {
        document.querySelectorAll(".status-menu").forEach(m => m.hidden = true);
        document.querySelectorAll(".status-btn").forEach(b => b.setAttribute("aria-expanded", "false"));
    }
});


function updateTaskStatus(select){
    const card = select.closest('.card');
    const id = card.dataset.id;                 
    const newStatus = select.value;
    select.classList.remove("status-inprocess","status-pending","status-completed");
    select.classList.add(statusClass(newStatus));

    const taskIndex = listOfTasks.findIndex(t => t.id === id);  
    if (taskIndex === -1) return;

    listOfTasks[taskIndex].status = newStatus;  
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
    const id = card.dataset.id;

    const taskIndex = listOfTasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        listOfTasks.splice(taskIndex, 1);
        localStorage.setItem('listOfTasks', JSON.stringify(listOfTasks));
        applyFilter();
    }
}

function statusIcon(status){
  if (status === "In process") return "icons/process.png";
  if (status === "Pending") return "icons/pending.png";
  if (status === "Completed") return "icons/completed.png";
  return "icons/process.png";
}

function renderTasks(TasksToRender){
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    TasksToRender.forEach((task,index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.id = task.id;
        card.dataset.status = task.status;
        card.innerHTML = `
            <strong class="title">${task.title}</strong>
            <span class="priority priority-${task.priority.toLowerCase()}">${task.priority}</span>

            <p>${task.description}</p>
            <div class="status-dd" data-id="${task.id}">
            <button class="status-btn" type="button" aria-haspopup="listbox" aria-expanded="false">
                <img class="status-btn-icon" src="${statusIcon(task.status)}" alt="">
                <span class="status-btn-text">${task.status}</span>
                <span class="status-caret">▾</span>
            </button>

            <div class="status-menu" role="listbox" hidden>
                <button class="status-item ${task.status === "In process" ? "is-active" : ""}" type="button" data-status="In process">
                <img src="icons/process.png" alt="" class="item-icon">
                <span>In process</span>
                <span class="item-check">${task.status === "In process" ? "✓" : ""}</span>
                </button>

                <button class="status-item ${task.status === "Pending" ? "is-active" : ""}" type="button" data-status="Pending">
                <img src="icons/pending.png" alt="" class="item-icon">
                <span>Pending</span>
                <span class="item-check">${task.status === "Pending" ? "✓" : ""}</span>
                </button>

                <button class="status-item ${task.status === "Completed" ? "is-active" : ""}" type="button" data-status="Completed">
                <img src="icons/completed.png" alt="" class="item-icon">
                <span>Completed</span>
                <span class="item-check">${task.status === "Completed" ? "✓" : ""}</span>
                </button>
            </div>
            </div>


            
            <button class="delete-btn" type="button">
                <img src="icons/delete.png" alt="" class="delete-icon">
                Delete
            </button>
        `;

        container.appendChild(card);

        
    });

    updateTaskCounters(TasksToRender);
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


function updateTaskCounters(tasksToRender) {
    const total = listOfTasks.length;
    const inProcess = listOfTasks.filter(task => task.status === "In process").length;
    const pending = listOfTasks.filter(task => task.status === "Pending").length;
    const completed = listOfTasks.filter(task => task.status === "Completed").length;

    
    
    document.getElementById("tasks-total").textContent = `Total: ${total}`;
    document.getElementById("tasks-process").textContent = `In process: ${inProcess}`;
    document.getElementById("tasks-pending").textContent = `Pending: ${pending}`;
    document.getElementById("tasks-completed").textContent = `Completed: ${completed}`;



   const visible = tasksToRender ? tasksToRender.length : 0;
    document.getElementById("tasks-visible").textContent = `Showing: ${visible}`;
}

const dd = document.getElementById("filter-dd");
const btn = document.getElementById("filter-btn");
const menu = document.getElementById("filter-menu");
const btnText = document.getElementById("filter-btn-text");
const btnIcon = document.getElementById("filter-btn-icon");

btn.addEventListener("click", () => {
  const isOpen = !menu.hidden;
  menu.hidden = isOpen;
  btn.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", (e) => {
  if (!dd.contains(e.target)) {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }
});

menu.querySelectorAll(".filter-item").forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value;

    activeFilter = value;
    applyFilter();

    // update button text
    btnText.textContent = item.querySelector("span:nth-child(2)")?.textContent || "All tasks";

    // show icon for status, hide for priority 
    if (item.dataset.icon) {
      btnIcon.src = item.dataset.icon;
      btnIcon.style.display = "inline-block";
    } else {
      btnIcon.style.display = "none";
    }

    // highlight + checkmark
    menu.querySelectorAll(".filter-item").forEach(b => b.classList.remove("is-active"));
    item.classList.add("is-active");

    menu.querySelectorAll(".item-check").forEach(c => c.textContent = "");
    const check = item.querySelector(".item-check");
    if (check) check.textContent = "✓";

    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  });
});

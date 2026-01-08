let listOfTasks = []
let activeFilter = 'ALL';

const bodyTheme = document.body
if (localStorage.getItem('theme') === 'dark') {
    bodyTheme.classList.add('dark-mode');
}

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
    } else if (!priority) {
        alert("Choose a priority")
        return false
    }
    console.log({ title, description, priority });



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
            <span class="priority priority-${(task.priority || "low").toLowerCase()}">
                ${task.priority || "LOW"}
            </span>

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
    filteredTasks = listOfTasks.filter(task => task.priority === "HIGH");
    }
    if (activeFilter === "MEDIUM") {
    filteredTasks = listOfTasks.filter(task => task.priority === "MEDIUM");
    }
    if (activeFilter === "LOW") {
    filteredTasks = listOfTasks.filter(task => task.priority === "LOW");
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

function initDropdown(ddElement, options = {}) {
  const btn = ddElement.querySelector(".filter-btn");
  const menu = ddElement.querySelector(".filter-menu");
  const btnText = ddElement.querySelector(".filter-btn-text");
  const btnIcon = ddElement.querySelector(".filter-btn-icon");
  const hiddenInput = ddElement.querySelector("input[type='hidden']");

  if (!btn || !menu) return;

  // Toggle open / close
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !menu.hidden;

    // close all other dropdowns
    document.querySelectorAll(".filter-menu").forEach(m => m.hidden = true);

    menu.hidden = isOpen;
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  // Click outside → close
  document.addEventListener("click", (e) => {
    if (!ddElement.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Item selection
  menu.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", () => {
      const value = item.dataset.value;
      const label =
        item.querySelector("span:nth-child(2)")?.textContent ||
        item.textContent;

      // Update visible text
      if (btnText) btnText.textContent = label;

      // Update hidden input (priority selector)
      if (hiddenInput) hiddenInput.value = value;

      // Optional callback (filter dropdown uses this)
      if (options.onSelect) {
        options.onSelect(item, value);
      }

      // Active state + checkmark
      menu.querySelectorAll(".filter-item").forEach(b => b.classList.remove("is-active"));
      item.classList.add("is-active");

      menu.querySelectorAll(".item-check").forEach(c => c.textContent = "");
      const check = item.querySelector(".item-check");
      if (check) check.textContent = "✓";

      // Close menu
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

const priorityDD = document.getElementById("priority-selector");

initDropdown(priorityDD);

const filterDD = document.getElementById("filter-dd");

initDropdown(filterDD, {
  onSelect: (item, value) => {
    activeFilter = value;
    applyFilter();

    const btnIcon = filterDD.querySelector(".filter-btn-icon");

    // Show icon for status filters
    if (item.dataset.icon && btnIcon) {
      btnIcon.src = item.dataset.icon;
      btnIcon.style.display = "inline-block";
    } else if (btnIcon) {
      btnIcon.style.display = "none";
    }
  }
});
const themeSelector = document.getElementById('themeSelector')

themeSelector.addEventListener('click', () => {
    bodyTheme.classList.toggle('dark-mode');

    if (bodyTheme.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
})

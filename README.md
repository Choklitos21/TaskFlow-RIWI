# TaskFlow

**A Lightweight Task Management Web Application (Vanilla JavaScript)**

TaskFlow is a front-end task management web application designed as a functional prototype. It demonstrates clean DOM manipulation, event-driven architecture, and maintainable UI design, implemented entirely with **Vanilla JavaScript**, **HTML5**, and **CSS3**.

The project showcases a complete **CRUD workflow**, dynamic UI rendering, centralized state management, and client-side persistence using the **LocalStorage API**.

---

## 🚀 Overview

TaskFlow enables users to create, manage, filter, and track tasks through an intuitive and responsive interface. Each task can be assigned a priority and workflow status, dynamically filtered, updated, or removed — all without page reloads.

The application was developed  focused on:
- Real DOM manipulation
- Event handling
- Code clarity and maintainability
- User-centered interface behavior

---

## ✨ Key Features

### 📝 Task Creation
- Task creation through a validated form
- Required fields:
  - Title
  - Description
  - Priority (High / Medium / Low)
- Real-time validation prevents empty or invalid submissions
- Immediate visual feedback on user actions

---

### ⚡ Dynamic Rendering
- Tasks are rendered dynamically via JavaScript
- No static or hardcoded task markup in HTML
- Uses real DOM APIs:
  - `createElement`
  - `innerHTML`
  - `dataset` attributes
- UI updates instantly without page reloads

---

### 🔄 Task Status Management
- Each task includes a custom status selector
- Supported workflow statuses:
  - Pending
  - In process
  - Completed
- Status updates trigger:
  - Visual task changes
  - Counter recalculation
  - Filter re-evaluation
- Fully event-driven behavior

---

### 🗑 Task Deletion
- Individual task deletion
- Deletion updates:
  - Central JavaScript state
  - DOM
  - LocalStorage
- No page refresh required

---

### 🔍 Filtering System
- Custom dropdown filter with icons and priority indicators
- Filter tasks by:
  - Status: All, Pending, In process, Completed
  - Priority: High, Medium, Low
- Conditional rendering based on active filters
- Filter state managed centrally to ensure consistency

---

### 📊 Task Statistics
- Real-time counters displayed in the toolbar:
  - Total tasks
  - Pending
  - In process
  - Completed
  - Currently visible (filtered)
- Counters automatically update on every state change

---

### 💾 Persistence
- Tasks are persisted using the **LocalStorage API**
- Data survives browser reloads
- Safe ID handling ensures backward compatibility with stored data

---

## 🛠 Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Custom styling, layout, and animations
- **JavaScript (Vanilla)** – Application logic, state management, DOM manipulation
- **Bootstrap** – Responsive UI components
- **LocalStorage API** – Client-side persistence
- **Git** – Version control

---

## 📂 Project Structure

```
TaskFlow/
│
├── index.html        # Application structure
├── styles.css        # Global styles and UI components
├── scripts.js        # Application logic and state management
├── icons/            # UI icons (status, priority, actions)
├── to-do-list.png    # Project reference image
└── README.md         # Project documentation
```

---

## 🧪 Validation & UX Considerations

- Prevents creation of empty or invalid tasks
- Visual affordances for:
  - Hover states
  - Active states
  - Status transitions
- Clear visual hierarchy for:
  - Title
  - Priority
  - Description
  - Status
  - Actions

---

## 👥 Authors

Developed as a collaborative academic project with role-based responsibilities:

- Technical leader
- Application logic & state manager
- UI/UX designer
- Testing & documentation

---

**TaskFlow** demonstrates how a well-structured, framework-free JavaScript application can deliver a clean, responsive, and fully functional task management experience.

let task = {
    title: String,
    description: String,
    priority: ["high", "medium", "low"],
    status: ["completed", "in process", "pending"]
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('¡El DOM está listo!'); // Muestra en la consola del navegador

    // Para mostrar en la página (ej. dentro de un <p id="mensaje"></p>)
    const elementoMensaje = document.getElementById('mensaje');
    if (elementoMensaje) {
        elementoMensaje.textContent = '¡Hola desde JavaScript al cargar la página!';
    }
});

function createTask() {
    newTask = new task()

}

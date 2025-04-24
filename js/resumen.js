document.addEventListener("DOMContentLoaded", () => {
    const resumenContenedor = document.querySelector(".pago-cart-items");
    const totalElemento = document.querySelector(".pago-total");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function actualizarTotal() {
        const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        totalElemento.textContent = `Total: Bs. ${total.toLocaleString('es-BO', { minimumFractionDigits: 2 })}`;
    }

    function mostrarResumenCarrito() {
        resumenContenedor.innerHTML = "";

        if (carrito.length === 0) {
            resumenContenedor.innerHTML = "<p>El carrito está vacío.</p>";
            totalElemento.textContent = "Total: Bs. 0,00";
            return;
        }

        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("pago-cart-item");

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="pago-img">
                <div class="pago-item-detalles">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: Bs. ${producto.precio.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</p>
                    <div class="pago-controles">
                        <button class="menos" data-index="${index}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="mas" data-index="${index}">+</button>
                        <button class="eliminar" data-index="${index}">🗑</button>
                    </div>
                    <p>Subtotal: Bs. ${(producto.precio * producto.cantidad).toLocaleString('es-BO', { minimumFractionDigits: 2 })}</p>
                </div>
            `;
            resumenContenedor.appendChild(item);
        });

        actualizarTotal();
    }

    resumenContenedor.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("mas")) {
            carrito[index].cantidad++;
        } else if (e.target.classList.contains("menos")) {
            if (carrito[index].cantidad > 1) carrito[index].cantidad--;
        } else if (e.target.classList.contains("eliminar")) {
            carrito.splice(index, 1);
        }
        guardarCarrito();
        mostrarResumenCarrito();
    });

    document.querySelector(".pago-vaciar").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarResumenCarrito();
    });

    document.querySelector(".pago-finalizar").addEventListener("click", () => {
        if (!validarFormulario()) return;
    
        generarFacturaPDF();
        alert("¡Gracias por tu compra!");
    
        // Limpiar el carrito y restablecer el formulario
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarResumenCarrito();
        document.querySelector("#pago-form-datos").reset();
    
        // Quitar el método de pago seleccionado
        document.querySelector("#metodo-seleccionado").value = ""; // Limpia el campo oculto
        document.querySelectorAll('.metodo-img').forEach(img => img.classList.remove('seleccionado')); // Limpia las clases seleccionadas
    });
    
    function validarFormulario() {
        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const direccion = document.querySelector("#direccion").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();
        const departamento = document.querySelector("#departamento").value;
        const metodoPago = document.querySelector("#metodo-seleccionado").value; // Cambiado aquí

        // Validación de nombre: solo letras y espacios
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
            alert("El campo 'Nombre completo' solo permite letras y espacios.");
            return false;
        }

        // Validación de correo: debe terminar en @gmail.com
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo)) {
            alert("El correo debe ser una dirección válida terminada en @gmail.com.");
            return false;
        }

        // Validación de dirección: no puede estar vacío
        if (direccion === "") {
            alert("Por favor, ingrese la dirección.");
            return false;
        }

        // Validación de teléfono: exactamente 8 dígitos
        if (!/^[0-9]{8}$/.test(telefono)) {
            alert("El campo 'Teléfono' debe contener exactamente 8 dígitos.");
            return false;
        }

        // Validación de departamento: debe seleccionarse uno
        if (departamento === "") {
            alert("Por favor, seleccione un departamento.");
            return false;
        }

        // Validación de método de pago: debe estar seleccionado
        if (!metodoPago) {
            alert("Seleccione un método de pago.");
            return false;
        }

        // Verifica que el carrito no esté vacío
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return false;
        }

        return true;
    }

    async function generarFacturaPDF() {
        const { jsPDF } = window.jspdf;

        // Configuración para tamaño carta y orientación horizontal
        const doc = new jsPDF({
            orientation: "landscape", // Horizontal
            unit: "mm",               // Unidades en milímetros
            format: "letter"          // Tamaño carta
        });

        // Agregar el logo desde la carpeta local
        const logo = new Image();
        logo.src = "./imagenes/Logo.png"; // Ruta relativa de la imagen
        doc.addImage(logo, "PNG", 10, 10, 50, 20); // Ajusta posición y tamaño del logo

        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const direccion = document.querySelector("#direccion").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();
        const departamento = document.querySelector("#departamento").value;
        const metodoPago = document.querySelector("#metodo-seleccionado").value;

        // Obtener la fecha y hora actuales
        const fechaHora = new Date();
        const fechaCompra = fechaHora.toLocaleDateString();
        const horaCompra = fechaHora.toLocaleTimeString();

        let y = 40; // Posición inicial en el eje Y
        doc.setFontSize(16);
        doc.text("Factura de Compra", 120, y, { align: "center" }); y += 10;

        // Imprimir fecha y hora de compra
        doc.setFontSize(12);
        doc.text(`Fecha: ${fechaCompra}`, 10, y);
        doc.text(`Hora: ${horaCompra}`, 10, y + 7);
        y += 14;

        doc.text(`Nombre: ${nombre}`, 10, y); y += 7;
        doc.text(`Correo: ${correo}`, 10, y); y += 7;
        doc.text(`Dirección: ${direccion}`, 10, y); y += 7;
        doc.text(`Teléfono: ${telefono}`, 10, y); y += 7;
        doc.text(`Departamento: ${departamento}`, 10, y); y += 7;
        doc.text(`Método de pago: ${metodoPago}`, 10, y); y += 10;

        doc.text("Productos:", 10, y); y += 7;
        carrito.forEach((producto, i) => {
            doc.text(
                `${i + 1}. ${producto.nombre} - Cant: ${producto.cantidad} - Unit: Bs. ${producto.precio.toLocaleString('es-BO', { minimumFractionDigits: 2 })} - Subtotal: Bs. ${(producto.cantidad * producto.precio).toLocaleString('es-BO', { minimumFractionDigits: 2 })}`,
                10,
                y
            );
            y += 7;
        });

        const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        y += 5;
        doc.setFontSize(14);
        doc.text(`Total a pagar: Bs. ${total.toLocaleString('es-BO', { minimumFractionDigits: 2 })}`, 10, y);

        doc.save("factura.pdf");
    }

    mostrarResumenCarrito();
});

function seleccionarMetodo(metodo) {
    // Elimina la clase "seleccionado" de todas las imágenes
    document.querySelectorAll('.metodo-img').forEach(img => img.classList.remove('seleccionado'));

    // Añade la clase "seleccionado" a la imagen seleccionada
    const imagenSeleccionada = document.getElementById(`opcion-${metodo.toLowerCase()}`);
    if (imagenSeleccionada) {
        imagenSeleccionada.classList.add('seleccionado');
    }

    // Guarda el método seleccionado en el campo oculto
    document.getElementById("metodo-seleccionado").value = metodo;

    // Mensaje de confirmación (opcional para depuración)
    console.log(`Método de pago seleccionado: ${metodo}`);
}

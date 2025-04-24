document.addEventListener("DOMContentLoaded", function () {
    // 🎥 Carrusel automático
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    function changeSlide() {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0";
        });

        index = (index + 1) % slides.length;
    }

    setInterval(changeSlide, 2500); // 🔥 Cambio cada 2.5 segundos

    // 📝 Validación de formulario de registro
    document.querySelector(".register-form").addEventListener("submit", function (event) {
        event.preventDefault(); // ⚠️ Evita el envío hasta validar

        const nombre = document.querySelector("#nombre").value.trim();
        const apellidoPaterno = document.querySelector("#apellido-paterno").value.trim();
        const apellidoMaterno = document.querySelector("#apellido-materno").value.trim();
        const ci = document.querySelector("#ci").value.trim();
        const celular = document.querySelector("#celular").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();

        // 🛠 Expresiones regulares para validar
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // 🔠 Solo letras y espacios
        const soloNumeros = /^[0-9]+$/; // 🔢 Solo números
        const correoGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // 📧 Solo @gmail.com
        const passwordSegura = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 🔐 8+ caracteres, 1 mayúscula, 1 número, 1 especial

        // 🚨 Validaciones
        if (!soloLetras.test(nombre)) {
            alert("⚠️ El nombre solo puede contener letras.");
            return;
        }
        if (!soloLetras.test(apellidoPaterno)) {
            alert("⚠️ El apellido paterno solo puede contener letras.");
            return;
        }
        if (!soloLetras.test(apellidoMaterno)) {
            alert("⚠️ El apellido materno solo puede contener letras.");
            return;
        }
        if (!soloNumeros.test(ci)) {
            alert("⚠️ El C.I. solo puede contener números.");
            return;
        }
        if (!soloNumeros.test(celular)) {
            alert("⚠️ El celular solo puede contener números.");
            return;
        }
        if (!correoGmail.test(email)) {
            alert("⚠️ Debes ingresar un correo válido de @gmail.com.");
            return;
        }
        if (!passwordSegura.test(password)) {
            alert("⚠️ La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial (@$!%*?&).");
            return;
        }

        alert("✅ Registro exitoso. ¡Bienvenido!");
        this.submit(); // 🔥 Envía el formulario si todo está bien
    });

    // 🔹 Restricción en tiempo real: máximo 8 caracteres en contraseña, incluso si copian y pegan
    document.querySelector("#password").addEventListener("input", function () {
        if (this.value.length > 8) {
            this.value = this.value.substring(0, 8); // 🔥 Recorta a 8 caracteres
        }
    });
});

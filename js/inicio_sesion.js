document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Validación del formulario de inicio de sesión
    document.querySelector(".login-btn").addEventListener("click", function () {
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();

        // Validar que el correo sea de Gmail
        if (!email.endsWith("@gmail.com")) {
            alert("⚠️ Ingresa un correo con @gmail.com.");
            return;
        }

        // Validar que los campos no estén vacíos
        if (email === "" || password === "") {
            alert("⚠️ No puedes dejar campos vacíos.");
            return;
        }

        // Validar que la contraseña tenga al menos 8 caracteres
        if (password.length < 8) {
            alert("⚠️ La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        alert(`✅ Iniciando sesión con:\nCorreo: ${email}\nContraseña: [Oculta]`);
    });

    // 🔹 Animación en "Crear Cuenta" al hacer clic en register-btn (sin redireccionamiento)
    document.querySelector(".register-btn").addEventListener("click", function () {
        document.body.style.transition = "opacity 0.8s ease-in-out"; // 🔥 Animación suave
        document.body.style.opacity = "0"; // 🔥 Desvanecer pantalla
    });

    // 🔹 Carrusel de imágenes con fade-in
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    function changeSlide() {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0";
        });
        index = (index + 1) % slides.length;
    }

    setInterval(changeSlide, 2500); // Cambio de imagen cada 2.5 segundos

    // 🔹 Mostrar/Ocultar contraseña con icono
    document.getElementById("toggle-password").addEventListener("click", function () {
        const passwordField = document.getElementById("password");
        const icon = this.querySelector("i");

        if (passwordField.type === "password") {
            passwordField.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash"); // Cambia a ojo cerrado
        } else {
            passwordField.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye"); // Cambia a ojo abierto
        }
    });

    // 🔹 Restricción en tiempo real: máximo 8 caracteres en contraseña
    document.querySelector("#password").addEventListener("input", function () {
        if (this.value.length > 8) {
            this.value = this.value.substring(0, 8); // 🔥 Recorta a 8 caracteres
        }
    });
});

// Lista simulada de productos
const productos = [
    { nombre: "Collar para perro", link: "/productos_perros/accesorio1.html" },
    { nombre: "Juguete para gato", link: "productos/juguete.html" },
    { nombre: "Comida para perro", link: "productos/comida-perro.html" },
    { nombre: "Arena para gato", link: "productos/arena.html" },
    { nombre: "Champú para mascotas", link: "productos/shampoo.html" }
    // Puedes agregar más productos aquí
];

const searchBar = document.getElementById("searchBar");
const searchModal = document.getElementById("searchModal");
const resultsList = document.getElementById("resultsList");

searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();
    resultsList.innerHTML = "";

    if (query === "") {
        searchModal.classList.add("hidden");
        return;
    }

    const resultados = productos
        .filter(producto => producto.nombre.toLowerCase().includes(query))
        .slice(0, 10); // Solo los primeros 10 resultados

    if (resultados.length === 0) {
        resultsList.innerHTML = "<li>No se encontraron resultados.</li>";
    } else {
        resultados.forEach(producto => {
            const li = document.createElement("li");
            li.textContent = producto.nombre;
            li.addEventListener("click", () => {
                window.location.href = producto.link;
            });
            resultsList.appendChild(li);
        });
    }

    searchModal.classList.remove("hidden");
});

function closeModal() {
    searchModal.classList.add("hidden");
}

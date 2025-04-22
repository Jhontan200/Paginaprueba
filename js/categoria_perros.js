const categories = document.querySelectorAll('.category');

function resetHover() {
    categories.forEach((category) => {
        category.querySelector('.category-image.default').style.opacity = '1';
        category.querySelector('.category-image.hover').style.opacity = '0';
        category.querySelector('.overlay').style.opacity = '0';
        category.querySelector('.category-title-hover').style.opacity = '0';
        category.querySelector('.category-text-hover').style.opacity = '0';
    });
}

categories.forEach((category) => {
    let startX = 0;
    let endX = 0;
    let isImageHovered = false;

    category.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    category.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;

        if (endX > startX + 50 && !isImageHovered) {
            category.querySelector('.category-image.default').style.opacity = '0';
            category.querySelector('.category-image.hover').style.opacity = '1';
            category.querySelector('.overlay').style.opacity = '1';
            category.querySelector('.category-title-hover').style.opacity = '1';
            category.querySelector('.category-text-hover').style.opacity = '1';
            isImageHovered = true;
        } else if (endX < startX - 50 && isImageHovered) {
            category.querySelector('.category-image.default').style.opacity = '1';
            category.querySelector('.category-image.hover').style.opacity = '0';
            category.querySelector('.overlay').style.opacity = '0';
            category.querySelector('.category-title-hover').style.opacity = '0';
            category.querySelector('.category-text-hover').style.opacity = '0';
            isImageHovered = false;
        }
    });

    category.addEventListener('mouseenter', () => {
        category.querySelector('.category-image.default').style.opacity = '0';
        category.querySelector('.category-image.hover').style.opacity = '1';
        category.querySelector('.overlay').style.opacity = '1';
        category.querySelector('.category-title-hover').style.opacity = '1';
        category.querySelector('.category-text-hover').style.opacity = '1';
    });

    category.addEventListener('mouseleave', () => {
        category.querySelector('.category-image.default').style.opacity = '1';
        category.querySelector('.category-image.hover').style.opacity = '0';
        category.querySelector('.overlay').style.opacity = '0';
        category.querySelector('.category-title-hover').style.opacity = '0';
        category.querySelector('.category-text-hover').style.opacity = '0';
    });
});

// Detecta cambios de tamaño en la pantalla y reinicia el estado del hover y touch
let prevWidth = window.innerWidth;

window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    
    if ((prevWidth >= 768 && currentWidth < 768) || (prevWidth < 768 && currentWidth >= 768)) {
        resetHover();
    }
    
    prevWidth = currentWidth;
});

//libreria https://swiperjs.com/
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
    },

  });


// Obtén una referencia al botón que mostrará/ocultará el carrito
const mostrarCarritoBtn = document.getElementById("mostrarCarrito");

// Agrega un evento de clic al botón
mostrarCarritoBtn.addEventListener("click", function () {
    const carritoDiv = document.getElementById("carrito");

    // Verifica si el carrito está visible
    if (carritoDiv.style.display === "none" || carritoDiv.style.display === "") {
        // Si está oculto, muestra el carrito
        carritoDiv.style.display = "block";
    } else {
        // Si está visible, oculta el carrito
        carritoDiv.style.display = "none";
    }
});


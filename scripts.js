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


// mostrar/ocultar el carrito
const mostrarCarritoBtn = document.getElementById("mostrarCarrito");


mostrarCarritoBtn.addEventListener("click", function () {
    const carritoDiv = document.getElementById("carrito");

    if (carritoDiv.style.display === "none" || carritoDiv.style.display === "") {
       
        carritoDiv.style.display = "block";
    } else {
     
        carritoDiv.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const productosDiv = document.getElementById("productos");
    const finalizarCompraBtn = document.getElementById("finalizarCompra");
    const carritoVacioDiv = document.getElementById("carrito-vacio");
    const listaCarrito = document.getElementById("lista-carrito");
    const buscador = document.getElementById("buscador");

    // Local storage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Mostrar productos
    function mostrarProductos(productos) {
        productosDiv.innerHTML = "";
        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");
            tarjeta.innerHTML = `
            <div class="card">
            <img src="${producto.imagen}" class="foto" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p>Colores disponibles:</p>
                <div class="color-indicators">
                    ${producto.colores.map(color => `
                        <div class="color-indicator" style="background-color: ${color.codigo};"></div>
                    `).join('')}
                </div>
                <p class="card-text">Precio $ ${producto.precio}</p>
                <label for="color">Color:</label>
                <select class="color-select" data-producto-id="${producto.id}">
                    ${producto.colores.map(color => `
                        <option value="${color.nombre}">${color.nombre}</option>
                    `).join('')}
                </select>
                <label for="talle">Talle:</label>
                <select class="talle-select" data-producto-id="${producto.id}">
                    ${producto.talle.map(talle => `
                        <option value="${talle}">${talle}</option>
                    `).join('')}
                </select>
                <button class="agregarCarrito" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            productosDiv.appendChild(tarjeta);
        });
    }

    // Cargar productos desde productos.json
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            const productos = data; 
            mostrarProductos(productos);

// Mostrar una notificación utilizando Toastify
            function mostrarNotificacion(mensaje, duracion) {
                Toastify({
                    text: mensaje,
                    duration: duracion,
                    gravity: "bottom",
                    position: "right",
                 
                }).showToast();
            }
            
            // Agregar un producto 
            function agregarAlCarrito(id) {
                const producto = productos.find(p => p.id === id);
                if (producto) {
            // Obtener las selecciones de color y talle del producto seleccionado
                    const colorSelect = document.querySelector(`.color-select[data-producto-id="${producto.id}"]`);
                    const talleSelect = document.querySelector(`.talle-select[data-producto-id="${producto.id}"]`);
                    const colorSeleccionado = colorSelect.value;
                    const talleSeleccionado = talleSelect.value;
            
                    // Verificar el color y el talle
                    if (!colorSeleccionado || !talleSeleccionado) {
                        alert('Por favor, selecciona un color y un talle antes de agregar al carrito.');
                        return;
                    }
            
                    producto.colorSeleccionado = colorSeleccionado;
                    producto.talleSeleccionado = talleSeleccionado;
            
                    carrito.push(producto);
                    actualizarElCarrito();

                    // Mostrar notificación de éxito
        mostrarNotificacion(`${producto.nombre} agregado al carrito`, 3000); 
                }
            }

         // Eliminar producto
            function eliminarDelCarrito(id) {
                carrito = carrito.filter(producto => producto.id !== id);
                actualizarElCarrito();
            }

        //Actualizacion del carrito

            function actualizarElCarrito() {
                listaCarrito.innerHTML = "";
                carrito.forEach(producto => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <span>${producto.nombre}</span>
                        <span>Color: ${producto.colorSeleccionado}</span>
                        <span>Talle: ${producto.talleSeleccionado}</span>
                        <span>Precio: $${producto.precio}</span>
                        <button class="eliminarCarrito" data-id="${producto.id}">Eliminar</button>
                    `;
                    listaCarrito.appendChild(li);
                });
            
                // Mostrar u ocultar el mensaje de carrito vacío
                if (carrito.length === 0) {
                    carritoVacioDiv.style.display = "block";
                } else {
                    carritoVacioDiv.style.display = "none";
                }
            
                // Guardar el carrito en el almacenamiento local
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
            // Finalizar la compra
            function finalizarCompra() {
                carrito = [];
                actualizarElCarrito();
            }

            // Agregar productos al carrito
            productosDiv.addEventListener("click", (e) => {
                if (e.target.classList.contains("agregarCarrito")) {
                    const id = parseInt(e.target.getAttribute("data-id"));
                    agregarAlCarrito(id);
                }
            });

            // Eliminar productos del carrito
            listaCarrito.addEventListener("click", (e) => {
                if (e.target.classList.contains("eliminarCarrito")) {
                    const id = parseInt(e.target.getAttribute("data-id"));
                    eliminarDelCarrito(id);
                }
            });


 // Función para abrir el modal de compra
 function abrirModalCompra() {
    const modalCompra = document.getElementById("modalCompra");
    modalCompra.style.display = "block";
}

// Función para cerrar el modal de compra
function cerrarModalCompraFunc() {
    const modalCompra = document.getElementById("modalCompra");
    modalCompra.style.display = "none";
}

// Evento clic en "Finalizar Compra"
finalizarCompraBtn.addEventListener("click", function () {
    abrirModalCompra();
});

// Función para generar el modal de compra
function generarModalCompra() {
    // Crear el modal
    const modalCompra = document.createElement("div");
    modalCompra.id = "modalCompra";
    modalCompra.classList.add("modal");

    // Contenido del modal
    modalCompra.innerHTML = `
    <div class="modal-content">
    <span id="cerrarModalCompra" class="close">&times;</span>
    <h2>Metodo de Pago</h2>
    <img class="tarjeta-credito" src="./imagenes/tarjeta.png" alt="tarjeta">
    <form id="formularioCompra">
        <label for="numeroTarjeta">Número de Tarjeta:</label>
        <input ype="text" id="numeroTarjetaInput" name="numeroTarjeta" required>
        <hr>
        <label for="nombreTitularTarjeta">Nombre del Titular:</label>
        <input type="text" id="nombreTitularTarjeta" name="nombreTitularTarjeta" required>
        <hr>
        <label for="fechaVencimiento">Fecha de Vencimiento:</label>
        <input type="text" id="fechaVencimiento" name="fechaVencimiento" placeholder="MM/YY" required>
        <hr>
        <label for="codigoSeguridad">Código de Seguridad:</label>
        <input type="text" id="codigoSeguridad" name="codigoSeguridad" required>
        <hr>
        <label for="tipoTarjeta">Tipo de Tarjeta:</label>
        <select id="tipoTarjeta" name="tipoTarjeta" required>
            <option value="None">-----------</option>
            <option value="Debito">Débito</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">MasterCard</option>
        </select>
        <hr>
        <label for="banco">Banco:</label>
        <select id="banco" name="banco" required>
        <option value="">--------------</option>
        <option value="BancoNacion">Banco de la Nación Argentina</option>
        <option value="BancoProvincia">Banco Provincia de Buenos Aires</option>
        <option value="BancoCiudad">Banco Ciudad</option>
        <option value="BancoGalicia">Banco Galicia</option>
        <option value="BancoSantander">Banco Santander Río</option>
        <option value="BancoBBVA">Banco BBVA</option>
        <option value="BancoMacro">Banco Macro</option>
        <option value="BancoCredicoop">Banco Credicoop</option>
        <option value="BancoHipotecario">Banco Hipotecario</option>
        <option value="BancoComafi">Banco Comafi</option>
        <option value="BancoPatagonia">Banco Patagonia</option>
        <option value="BancoSupervielle">Banco Supervielle</option>
        <option value="TarjetaNaranja">Tarjeta Naranja</option>
        </select>

        <hr>
        <label>Cuotas:</label>
        <div>
            <input type="checkbox" id="opcion1" name="preferencias" value="Opción 1">
            <label for="opcion1">3 Cuotas</label>
        </div>
        <div>
            <input type="checkbox" id="opcion2" name="preferencias" value="Opción 2">
            <label for="opcion2">6 Cuotas</label>
        </div>
        <div>
            <input type="checkbox" id="opcion3" name="preferencias" value="Opción 3">
            <label for="opcion3">12 Cuotas</label>
        </div>
        <div>
            <input type="checkbox" id="opcion4" name="preferencias" value="Opción 4">
            <label for="opcion4">Plan Z</label>
        </div>
    </form>
    <hr>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" required>

        <label for="codigoPostal">Código Postal:</label>
        <input type="text" id="codigoPostal" name="codigoPostal" required>
        <button id="confirmarCompraBtn" type="submit">Confirmar Compra</button>
    </form>
</div>
    `;
    
    // Agregar el modal al contenedor
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.appendChild(modalCompra);

    // Evento clic para cerrar el modal
    const cerrarModalCompra = document.getElementById("cerrarModalCompra");
    cerrarModalCompra.addEventListener("click", function () {
        cerrarModalCompraFunc();
    });

    //interaccion checkbox
const checkboxes = document.querySelectorAll('input[name="preferencias"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        
        // Si se marca este checkbox, desmarca los otros
        if (this.checked) {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});


//funciones para restringir el imput 
const numeroTarjetaInput = document.getElementById("numeroTarjetaInput");
const fechaVencimiento = document.getElementById("fechaVencimiento");
const codigoSeguridad = document.getElementById("codigoSeguridad");
const codigoPostal = document.getElementById("codigoPostal");

//funcion para solo poner 16 numeros
numeroTarjetaInput.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
  
    if (valor.length > 16) {
      valor = valor.slice(0, 16);
    }
  
    this.value = valor;
  });

//funcion para que la fecha tenga formato "dos digitos / dos digitos"
fechaVencimiento.addEventListener("input", function () {
    let valor = this.value.replace(/[^\d/]/g, "");
    
    if (valor.length > 5) {
      valor = valor.slice(0, 5);
    }

    if (/^\d{2}$/.test(valor)) {
      valor += "/";
    }
  
    if (valor.length === 5 && !/\d/.test(valor[4])) {
      valor = valor.slice(0, 4);
    }
  
    this.value = valor;
  });
  
  //funcion para solo poner 3 numeros
  codigoSeguridad.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
  
    if (valor.length > 3) {
      valor = valor.slice(0, 3);
    }
  
    this.value = valor;
  });

   //funcion para solo poner 4 numeros
   codigoPostal.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
  
    if (valor.length > 4) {
      valor = valor.slice(0, 4);
    }
  
    this.value = valor;
  });


// Función para verificar si todos los campos están completos y el Plan Z 
function verificarCamposYPlanZ() {
    const numeroTarjeta = document.getElementById("numeroTarjetaInput").value;
    const nombreTitular = document.getElementById("nombreTitularTarjeta").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const codigoSeguridad = document.getElementById("codigoSeguridad").value;
    const direccion = document.getElementById("direccion").value;
    const codigoPostal = document.getElementById("codigoPostal").value;
    const tipoTarjeta = document.getElementById("tipoTarjeta").value;
    const banco = document.getElementById("banco").value;

    const planZOption = document.getElementById("opcion4");
    const planZSeleccionado = planZOption.checked;

    // Verifica si algún campo está vacío o si el Plan Z es inválido
    if (
        numeroTarjeta === "" ||
        nombreTitular === "" ||
        fechaVencimiento === "" ||
        codigoSeguridad === "" ||
        direccion === "" ||
        codigoPostal === "" ||
        tipoTarjeta === "" ||
        banco === ""
    ) {
        // Muestra la alerta de error de campos vacíos
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos deben estar completos',
            customClass: {
                container: 'swal-custom' 
            },
            onOpen: () => {
                document.querySelector('.swal-custom .swal2-popup').style.zIndex = 10002;
            }
        });
    } else if (planZSeleccionado && banco !== "TarjetaNaranja") {
        // Muestra la alerta de error para Plan Z si el banco no es Tarjeta Naranja
        mostrarNotificacion("Plan Z solo es válido para Tarjeta Naranja", 3000);
    } else {
        // Cierra el modal
        cerrarModalCompraFunc();

        // Vacía el carrito de compras
        carrito = [];
        actualizarElCarrito();

        // Muestra la alerta de éxito
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Tu compra se ha realizado con éxito!',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

// Agregar un evento click al botón "Confirmar Compra" y verificar todo
const confirmarCompraBtn = document.getElementById("confirmarCompraBtn");
confirmarCompraBtn.addEventListener("click", function (event) {
    event.preventDefault(); 
    verificarCamposYPlanZ();
});

}

// Llama a la función para generar el modal
generarModalCompra();

            
            // Buscar productos
            buscador.addEventListener("input", () => {
                const textoBuscado = buscador.value.toLowerCase();
                const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(textoBuscado));
                mostrarProductos(productosFiltrados);
            });

            // Inicializar la página
            actualizarElCarrito();
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });   
});


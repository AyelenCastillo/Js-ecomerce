let productos;

document.addEventListener('DOMContentLoaded', function () {
    const filtroColor = document.getElementById('filtroColor');
    const aplicarFiltro = document.getElementById('aplicarFiltro');
    const articuloCartas = document.getElementById('cartas');
    const modal = document.getElementById('modal');

    modal.addEventListener('click', function (event) {
        if (event.target === this) {
            this.close();
        }
    });

// CREAR TARJETAS
    function crearTarjetaProducto(producto) {
        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.innerHTML = `
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
                    <button class="btn btn-primary comprar-btn"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-colores="${producto.colores.map(color => color.nombre).join(',')}"
                        data-precio="${producto.precio}"
                        data-talle="${producto.talle.join(',')}"
                        data-imagen="${producto.imagen}">Comprar</button>
                </div>
            </div>
        `;
        return nuevaTarjeta;
    }
//BUSCAR EN JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
 
            //BUSCADOR COLORES
            const coloresUnicos = [...new Set(productos.flatMap(producto => producto.colores.map(color => color.nombre)))];
            
            const optionTodosColores = document.createElement('option');
            optionTodosColores.value = '';
            optionTodosColores.text = 'Todos los colores';
            filtroColor.appendChild(optionTodosColores);
            
            coloresUnicos.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.text = color;
                filtroColor.appendChild(option);
            });
            //FILTRO
            aplicarFiltro.addEventListener('click', function () {
                const colorSeleccionado = filtroColor.value;
                // Borra las tarjetas actuales antes de aplicar el filtro
                while (articuloCartas.firstChild) {
                    articuloCartas.removeChild(articuloCartas.firstChild);
                }
                productos.forEach(producto => {
                    if (colorSeleccionado === '' || producto.colores.some(color => color.nombre === colorSeleccionado)) {
                        const nuevaTarjeta = crearTarjetaProducto(producto);
                        articuloCartas.appendChild(nuevaTarjeta);
                    }
                });
            });

            aplicarFiltro.click();
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

//CREAR EL MODAL
    articuloCartas.addEventListener('click', function (event) {
        if (event.target.classList.contains('comprar-btn')) {
            const productId = event.target.getAttribute('data-id');
            const productName = event.target.getAttribute('data-nombre');
            const productColores = event.target.getAttribute('data-colores');
            const productPrecio = event.target.getAttribute('data-precio');
            const productImg = event.target.getAttribute('data-imagen');
            const productTalle = event.target.getAttribute('data-talle').split(',');
            const coloresDisponibles = productColores.split(',');
            const colorOptions = coloresDisponibles.map(color => `
                <option value="${color}">${color}</option>
            `).join('');
            const talleOptions = productTalle.map(talle => `
                <option value="${talle}">${talle}</option>
            `).join('');

            const modalContent = `
                <h2>Selecciona las opciones para ${productName}:</h2>
                <div class="modal-content">
                    <div class="producto-image">
                        <img src="${productImg}" class="foto" alt="${productName}">
                    </div>
                    <div class="producto-details">
                        <p>Descripción del producto:</p>
                        <p>Precio: $${productPrecio}</p>
                        <label for="color">Color:</label>
                        <select id="color">
                            ${colorOptions}
                        </select>
                        <label for="talle">Talle:</label>
                        <select id="talle">
                            ${talleOptions}
                        </select>
                    </div>
                </div>
                <button onclick="agregarAlCarrito('${productId}', '${productName}', ${productPrecio})">Agregar al carrito</button>
            `;

            modal.innerHTML = modalContent;
            modal.showModal();
        }
    });
});



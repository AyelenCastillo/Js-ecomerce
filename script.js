// la pagina html y el js aun no estan conectados, lo que se ve en el html es solo el esqueleto de la pagina. y no interactua con nada de lo de este archivo
const ropa = [
    {
        title: "Camisa Femenina Volado",
        talles: ["XS", "S", "M", "L", "XL"],
        colores: ["Blanco", "Negro", "Amarillo", "Violeta"],
        precio: 25000
    },
    {
        title: "Camisa Masculina Clasica",
        talles: ["XS", "S", "M", "L", "XL"],
        colores: ["Blanco", "Negro", "Amarillo", "Azul"],
        precio: 25000
    },
    {
        title: "Jean Femenino Oxford",
        talles: ["XS", "S", "M", "L", "XL"],
        colores: ["Azul","Negro","Blanco"],
        precio: 17000
    },
    {
        title: "Jean Hombre Clasico",
        talles: ["XS", "S", "M", "L", "XL"],
        colores: ["Azul","Negro"],
        precio: 17000
    },
    {
        title: "Vestido Marinero",
        talles: ["XS", "S", "M", "L", "XL"],
        colores: ["Blanco", "Negro", "Floreado", "Cuadrille"],
        precio: 30000
    }
];

// buscador, quiero poner en la pagina un buscador que tenga la barra de busqueda y que abajo tenga iconitos de ropa, x ej un dibujo de un vestido y tenga escrito vestudos abajo
//y q vallan desapareciendo o apareciendo a medida que la persona inserta la palabra
//quisiera saber si la funciond e buscar prendas con palabra clave sirve como base para hacer eso
function buscarPrendasPorPalabraClave(palabraClave) {
    const resultados = ropa.filter((prenda) => {
        const palabrasClaveTitulo = prenda.title.split(' ').map(word => word.toLowerCase());
        return palabrasClaveTitulo.includes(palabraClave.toLowerCase());
    });

    if (resultados.length == 0) {
        alert("No se encontraron prendas.");
    } else {
        console.log("Resultados que coinciden con la búsqueda:");
        resultados.forEach((prenda) => {
            console.log("Título:", prenda.title);
            console.log("Talles:", prenda.talles);
            console.log("Colores:", prenda.colores);
            console.log("Precio:", prenda.precio);
            console.log("----------");
        });

        seleccionarPrenda(resultados);

        if (Math.random() < 0.5) {
            alert("Lo siento, el artículo seleccionado no está disponible en este momento.");
        } else {
            alert("Gracias por usar el buscador.");
        }
    }
}

do {
    const palabraClave = prompt("¿Qué prenda deseas buscar?:");

    if (palabraClave) {
        buscarPrendasPorPalabraClave(palabraClave);
    } else {
        alert("Debes ingresar una palabra clave válida.");
    }

    const realizarOtraBusqueda = prompt("¿Deseas realizar otra búsqueda? (Sí/No)").toLowerCase();

    if (realizarOtraBusqueda !== "si" && realizarOtraBusqueda !== "sí") {
        alert("Gracias por usar nuestro servicio de búsqueda.");
        break; 
    }
} while (true);

function seleccionarPrenda(resultados) {
    if (resultados.length === 0) {
        alert("No hay resultados para seleccionar.");
        return;
    }

    const prendaElegida = prompt("Elige una prenda de la lista:\n" + resultados.map(prenda => prenda.title).join("\n"));
    
    if (!prendaElegida) {
        alert("Debes seleccionar una prenda válida.");
        return;
    }

    const prendaSeleccionada = resultados.find(prenda => prenda.title.toLowerCase() === prendaElegida.toLowerCase());

    if (!prendaSeleccionada) {
        alert("La prenda seleccionada no se encuentra en la lista.");
        return;
    }

    const talleElegido = prompt("Elige un talle de la lista:\n" + prendaSeleccionada.talles.map(talle => talle.toLowerCase()).join("\n"));
    const colorElegido = prompt("Elige un color de la lista:\n" + prendaSeleccionada.colores.map(color => color.toLowerCase()).join("\n"));

    if (!prendaSeleccionada.talles.map(talle => talle.toLowerCase()).includes(talleElegido.toLowerCase()) || 
        !prendaSeleccionada.colores.map(color => color.toLowerCase()).includes(colorElegido.toLowerCase())) {
        alert("El talle o color elegido no es válido para esta prenda.");
        return;
    }

    alert(`Has seleccionado la siguiente prenda:
    - Prenda: ${prendaSeleccionada.title}
    - Talle: ${talleElegido}
    - Color: ${colorElegido}
    - Precio: ${prendaSeleccionada.precio}`);
}


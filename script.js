function Remera(colorcito, talle){
  this.color = colorcito
  this.talle = talle

  this.mostrarRemera = function(){
    alert("Remera color: " + this.color + "\nTalle: " + this.talle)
  }
}

const remeras = [
  new Remera("rojo", "XL"),
  new Remera("azul", "XL"),
  new Remera("verde", "M"),
  new Remera("blanco", "XS"),
  new Remera("amarillo", "L")
];

function mostrarOpcionesRemeras() {
  do {
    const opcionesTipo = prompt("Elige el tipo de vestimenta:\n1. Vestido\n2. Camisa\n3. Remera")
    const tipoSeleccionado = parseInt(opcionesTipo)

    const talleSeleccionado = prompt("Elige el talle (S, M, L, XL):")
    if ( talleSeleccionado=='s', "m", "l", "xl", "S", "M", "L", "XL") {
    } else {
      alert("Objeto No Encontrado")
      return
    }
    
  
    const colorSeleccionado = prompt("Elige el color (Negro, Blanco, Rojo, Azul, Amarillo):")
    if ( colorSeleccionado=="negro", "blanco", "rojo", "azul", "amarillo", "Negro", "Blanco", "Rojo", "Azul", "Amarillo") {
    } else {
      alert("Objeto No Encontrado")
      return
    }
// quise intentar una funcion flecha, me costo mucho y tube q buscar en internet , la dejo asi xq funciona pero cuando quise chequear que realmente estaba bien hecha a traves 
// del console.log, siempre me arrojo el mensaje de "Error" aunque los parametro los pusiera bien y el prompt arrojara bien el precio. 
    const remeraElegida = remeras.find(remera =>
      remera.color.toLowerCase() === colorSeleccionado.toLowerCase() && remera.talle.toLowerCase() === talleSeleccionado.toLowerCase()
    )
    if (remeraElegida) {
      console.log("Color de la prenda elegida: " + colorSeleccionado);
      console.log("Talle de la prenda elegida: " + talleSeleccionado);
    } else {
      console.log("Error");
    }
    

    let precioVestimenta = 0
    switch (tipoSeleccionado) {
      case 1: // Vestido
        precioVestimenta = 10000
        break;
      case 2: // Camisa
        precioVestimenta = 6000
        break;
      case 3: // Remera
        precioVestimenta = 2000
        break
      default:
        alert("Objeto No Encontrado")
        continue
    }

    if (!remeraElegida) {
      alert("El precio de la vestimenta es: $" + precioVestimenta)
    } 

    const continuar = prompt("¿Deseas realizar otra selección? (Sí/No)").toLowerCase()
    if (continuar !== "si" && continuar !== "sí") {
      break
    }
  } while (true)
}

mostrarOpcionesRemeras()

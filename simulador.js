function calcular() {
  let ingresos = obtenerValores("txtIngresos");
  let egresos = obtenerValores("txtEgresos");
  let disponible = calcularDisponible(ingresos, egresos).toFixed(2);
  let capacidadPago = calcularCapacidadPago(disponible).toFixed(2);

  mostrarEnPantalla("spnDisponible", disponible);
  mostrarEnPantalla("spnCapacidadPago", capacidadPago);
}

function obtenerValores(id) {
  return parseFloat(document.getElementById(id).value);
}

function mostrarEnPantalla(id, valor) {
  document.getElementById(id).innerHTML = valor;
}

function calcular() {
  let ingresos = obtenerValores("txtIngresos");
  let egresos = obtenerValores("txtEgresos");
  let disponible = calcularDisponible(ingresos, egresos).toFixed(2);
  let capacidadPago = calcularCapacidadPago(disponible).toFixed(2);

  // Solicitud de crédito
  let montoSolicitado = obtenerValorEntero("txtMonto");
  let plazoAnios = obtenerValorEntero("txtPlazo");
  let tasaAnual = obtenerValorEntero("txtTasaInteres");

  let montoInteres = calcularInteresSimple(
    montoSolicitado,
    plazoAnios,
    tasaAnual,
  ).toFixed(2);

  mostrarEnPantalla("spnDisponible", disponible);
  mostrarEnPantalla("spnCapacidadPago", capacidadPago);
  mostrarEnPantalla("spnInteresPagar", montoInteres);
}

function obtenerValores(id) {
  return parseFloat(document.getElementById(id).value);
}

function obtenerValorEntero(id) {
  return parseInt(document.getElementById(id).value);
}

function mostrarEnPantalla(id, valor) {
  document.getElementById(id).innerHTML = valor;
}

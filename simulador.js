function calcular() {
  let ingresos = obtenerValores("txtIngresos");
  let egresos = obtenerValores("txtEgresos");
  let disponible = calcularDisponible(ingresos, egresos);
  let capacidadPago = calcularCapacidadPago(disponible);

  // Solicitud de crédito
  let montoSolicitado = obtenerValorEntero("txtMonto");
  let plazoAnios = obtenerValorEntero("txtPlazo");
  let tasaAnual = obtenerValorEntero("txtTasaInteres");

  let montoInteres = calcularInteresSimple(
    montoSolicitado,
    plazoAnios,
    tasaAnual,
  );

  let totalPrestamo = calcularTotalPagar(montoSolicitado, montoInteres);
  let cuotaMensual = calcularCuotaMensual(totalPrestamo, plazoAnios);

  // Estado de credito
  let analizarEstado = aprobarCredito(capacidadPago, cuotaMensual);

  if (analizarEstado === true) {
    mostrarEnPantalla("spnEstadoCredito", "CRÉDITO APROBADO");
  } else {
    mostrarEnPantalla("spnEstadoCredito", "CRÉDITO RECHAZADO");
  }

  mostrarEnPantalla("spnDisponible", disponible.toFixed(2));
  mostrarEnPantalla("spnCapacidadPago", capacidadPago.toFixed(2));
  mostrarEnPantalla("spnInteresPagar", montoInteres.toFixed(2));
  mostrarEnPantalla("spnTotalPrestamo", totalPrestamo);
  mostrarEnPantalla("spnCuotaMensual", cuotaMensual.toFixed(2));
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

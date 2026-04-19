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
    tasaAnual,
    plazoAnios,
  );

  let totalPrestamo = calcularTotalPagar(montoSolicitado, montoInteres);
  let cuotaMensual = calcularCuotaMensual(totalPrestamo, plazoAnios);

  // Estado de credito
  let analizarEstado = aprobarCredito(capacidadPago, cuotaMensual);

  let boxEstado = document.getElementById("boxEstadoCredito");

  boxEstado.classList.remove(
    "info-box--analizando",
    "info-box--aprobado",
    "info-box--rechazado",
  );

  if (analizarEstado === true) {
    mostrarEnPantalla("spnEstadoCredito", "CRÉDITO APROBADO");
    boxEstado.classList.add("info-box--aprobado");
  } else {
    mostrarEnPantalla("spnEstadoCredito", "CRÉDITO RECHAZADO");
    boxEstado.classList.add("info-box--rechazado");
  }

  mostrarEnPantalla("spnDisponible", disponible.toFixed(2));
  mostrarEnPantalla("spnCapacidadPago", capacidadPago.toFixed(2));
  mostrarEnPantalla("spnInteresPagar", montoInteres.toFixed(2));
  mostrarEnPantalla("spnTotalPrestamo", totalPrestamo);
  mostrarEnPantalla("spnCuotaMensual", cuotaMensual.toFixed(2));
}

function formatearMoneda(valor) {
  return "$" + Number(valor).toFixed(2);
}

function reiniciar() {
  document.getElementById("txtIngresos").value = "";
  document.getElementById("txtEgresos").value = "";
  document.getElementById("txtMonto").value = "";
  document.getElementById("txtPlazo").value = "5";
  document.getElementById("txtTasaInteres").value = "";

  mostrarEnPantalla("spnDisponible", "$0.00");
  mostrarEnPantalla("spnCapacidadPago", "$0.00");
  mostrarEnPantalla("spnInteresPagar", "$0.00");
  mostrarEnPantalla("spnTotalPrestamo", "$0.00");
  mostrarEnPantalla("spnCuotaMensual", "$0.00");
  mostrarEnPantalla("spnEstadoCredito", "ANALIZANDO...");

  let boxEstado = document.getElementById("boxEstadoCredito");
  boxEstado.classList.remove("info-box--aprobado", "info-box--rechazado");
  boxEstado.classList.add("info-box--analizando");
}

//Mobile functions
function irPaso(numeroPaso) {
  document.querySelectorAll(".mobile-step").forEach((step) => {
    step.classList.remove("is-active");
  });

  document.getElementById("step" + numeroPaso).classList.add("is-active");
}

function cambiarPlazo(cambio) {
  const inputHidden = document.getElementById("mTxtPlazoValor");
  const inputTexto = document.getElementById("mTxtPlazo");

  let valorActual = parseInt(inputHidden.value);
  valorActual += cambio;

  if (valorActual < 1) {
    valorActual = 1;
  }

  if (valorActual > 5) {
    valorActual = 5;
  }

  inputHidden.value = valorActual;
  inputTexto.value = valorActual + (valorActual === 1 ? " año" : " años");
}

function calcularMobile() {
  let ingresos = parseFloat(document.getElementById("mTxtIngresos").value);
  let egresos = parseFloat(document.getElementById("mTxtEgresos").value);
  let montoSolicitado = parseFloat(document.getElementById("mTxtMonto").value);
  let plazoAnios = parseInt(document.getElementById("mTxtPlazoValor").value);
  let tasaAnual = parseFloat(document.getElementById("mTxtTasaInteres").value);

  let disponible = calcularDisponible(ingresos, egresos);
  let capacidadPago = calcularCapacidadPago(disponible);
  let montoInteres = calcularInteresSimple(
    montoSolicitado,
    tasaAnual,
    plazoAnios,
  );
  let totalPrestamo = calcularTotalPagar(montoSolicitado, montoInteres);
  let cuotaMensual = calcularCuotaMensual(totalPrestamo, plazoAnios);
  let analizarEstado = aprobarCredito(capacidadPago, cuotaMensual);

  mostrarEnPantalla("mSpnDisponible", formatearMoneda(disponible));
  mostrarEnPantalla("mSpnCapacidadPago", formatearMoneda(capacidadPago));
  mostrarEnPantalla("mSpnInteresPagar", formatearMoneda(montoInteres));
  mostrarEnPantalla("mSpnTotalPrestamo", formatearMoneda(totalPrestamo));
  mostrarEnPantalla("mSpnCuotaMensual", formatearMoneda(cuotaMensual));

  if (analizarEstado === true) {
    mostrarEnPantalla("mSpnEstadoCredito", "CRÉDITO APROBADO");
  } else {
    mostrarEnPantalla("mSpnEstadoCredito", "CRÉDITO RECHAZADO");
  }

  irPaso(3);
}

function reiniciarMobile() {
  document.getElementById("mTxtIngresos").value = "";
  document.getElementById("mTxtEgresos").value = "";
  document.getElementById("mTxtMonto").value = "";
  document.getElementById("mTxtTasaInteres").value = "";
  document.getElementById("mTxtPlazoValor").value = "5";
  document.getElementById("mTxtPlazo").value = "5 años";

  mostrarEnPantalla("mSpnDisponible", "$0.00");
  mostrarEnPantalla("mSpnCapacidadPago", "$0.00");
  mostrarEnPantalla("mSpnInteresPagar", "$0.00");
  mostrarEnPantalla("mSpnTotalPrestamo", "$0.00");
  mostrarEnPantalla("mSpnCuotaMensual", "$0.00");
  mostrarEnPantalla("mSpnEstadoCredito", "ANALIZANDO...");

  irPaso(1);
}

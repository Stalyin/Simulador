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

  let boxEstado = obtenerTexto("boxEstadoCredito");

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
  mostrarEnPantalla("spnTotalSolicitud", montoSolicitado.toFixed(2));
  mostrarEnPantalla("spnTotalInteres", montoInteres.toFixed(2));
  mostrarEnPantalla("spnTotalSolca", "$100.00");
  mostrarEnPantalla("spnInteresPagar", montoInteres.toFixed(2));
  mostrarEnPantalla("spnTotalPrestamo", totalPrestamo);
  mostrarEnPantalla("spnCuotaMensual", cuotaMensual.toFixed(2));
}

function formatearMoneda(valor) {
  return "$" + Number(valor).toFixed(2);
}

function reiniciar() {
  obtenerTexto("txtIngresos").value = "";
  obtenerTexto("txtEgresos").value = "";
  obtenerTexto("txtMonto").value = "";
  obtenerTexto("txtPlazo").value = "5";
  obtenerTexto("txtTasaInteres").value = "";

  mostrarEnPantalla("spnDisponible", "$0.00");
  mostrarEnPantalla("spnCapacidadPago", "$0.00");
  mostrarEnPantalla("spnInteresPagar", "$0.00");
  mostrarEnPantalla("spnTotalPrestamo", "$0.00");
  mostrarEnPantalla("spnCuotaMensual", "$0.00");
  mostrarEnPantalla("spnEstadoCredito", "ANALIZANDO...");

  let boxEstado = obtenerTexto("boxEstadoCredito");
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
  const inputHidden = obtenerTexto("mTxtPlazoValor");
  const inputTexto = obtenerTexto("mTxtPlazo");

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
  let ingresos = obtenerValores("mTxtIngresos");
  let egresos = obtenerValores("mTxtEgresos");
  let montoSolicitado = obtenerValores("mTxtMonto");
  let plazoAnios = obtenerValores("mTxtPlazoValor");
  let tasaAnual = obtenerValores("mTxtTasaInteres");

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
  mostrarEnPantalla("mSpnTotalSolicitud", montoSolicitado.toFixed(2));
  mostrarEnPantalla("mSpnTotalInteres", montoInteres.toFixed(2));
  mostrarEnPantalla("mSpnTotalSolca", "$100.00");
  mostrarEnPantalla("mSpnTotalPrestamo", formatearMoneda(totalPrestamo));
  mostrarEnPantalla("mSpnCuotaMensual", formatearMoneda(cuotaMensual));

  let boxEstado = obtenerTexto("state-box-mobile");

  boxEstado.classList.remove(
    "info-box--analizando",
    "info-box--aprobado",
    "info-box--rechazado",
  );

  if (analizarEstado === true) {
    mostrarEnPantalla("mSpnEstadoCredito", "CRÉDITO APROBADO");
    boxEstado.classList.add("info-box--aprobado");
  } else {
    mostrarEnPantalla("mSpnEstadoCredito", "CRÉDITO RECHAZADO");
    boxEstado.classList.add("info-box--rechazado");
  }

  irPaso(3);
}

function reiniciarMobile() {
  obtenerTexto("mTxtIngresos").value = "";
  obtenerTexto("mTxtEgresos").value = "";
  obtenerTexto("mTxtMonto").value = "";
  obtenerTexto("mTxtTasaInteres").value = "";
  obtenerTexto("mTxtPlazoValor").value = "5";
  obtenerTexto("mTxtPlazo").value = "5 años";

  mostrarEnPantalla("mSpnDisponible", "$0.00");
  mostrarEnPantalla("mSpnCapacidadPago", "$0.00");
  mostrarEnPantalla("mSpnInteresPagar", "$0.00");
  mostrarEnPantalla("mSpnTotalPrestamo", "$0.00");
  mostrarEnPantalla("mSpnCuotaMensual", "$0.00");
  mostrarEnPantalla("mSpnEstadoCredito", "ANALIZANDO...");
  let boxEstado = obtenerTexto("state-box-mobile");
  boxEstado.classList.remove("info-box--aprobado", "info-box--rechazado");
  boxEstado.classList.add("info-box--analizando");

  irPaso(1);
}

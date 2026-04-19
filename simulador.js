function calcular() {
  limpiarErroresFormulario();

  let ingresos = obtenerValores("txtIngresos");
  let egresos = obtenerValores("txtEgresos");
  let disponible = calcularDisponible(ingresos, egresos);
  let capacidadPago = calcularCapacidadPago(disponible);
  // Solicitud de crédito
  let montoSolicitado = obtenerValorEntero("txtMonto");
  let plazoAnios = obtenerValorEntero("txtPlazo");
  let tasaAnual = obtenerValorEntero("txtTasaInteres");

  let formularioValido = true;

  // Validaciones: obligatorios
  if (
    !validarRequeridoNumero(
      "txtIngresos",
      "errorTxtIngresos",
      ingresos,
      "ingresos mensuales",
    )
  ) {
    formularioValido = false;
  }

  if (
    !validarRequeridoNumero(
      "txtEgresos",
      "errorTxtEgresos",
      egresos,
      "egresos mensuales",
    )
  ) {
    formularioValido = false;
  }

  if (
    !validarRequeridoNumero(
      "txtMonto",
      "errorTxtMonto",
      montoSolicitado,
      "monto solicitado",
    )
  ) {
    formularioValido = false;
  }

  if (
    !validarRequeridoNumero("txtPlazo", "errorTxtPlazo", plazoAnios, "plazo")
  ) {
    formularioValido = false;
  }

  if (
    !validarRequeridoNumero(
      "txtTasaInteres",
      "errorTxtTasaInteres",
      tasaAnual,
      "tasa de interés",
    )
  ) {
    formularioValido = false;
  }

  // Validaciones de rango
  if (!estaVacio(ingresos)) {
    if (
      !validarRangoNumero(
        "txtIngresos",
        "errorTxtIngresos",
        ingresos,
        1,
        100000,
        "ingresos mensuales",
      )
    ) {
      formularioValido = false;
    }
  }

  if (!estaVacio(egresos)) {
    if (
      !validarRangoNumero(
        "txtEgresos",
        "errorTxtEgresos",
        egresos,
        0,
        100000,
        "egresos mensuales",
      )
    ) {
      formularioValido = false;
    }
  }

  if (!estaVacio(montoSolicitado)) {
    if (
      !validarRangoNumero(
        "txtMonto",
        "errorTxtMonto",
        montoSolicitado,
        100,
        100000,
        "monto solicitado",
      )
    ) {
      formularioValido = false;
    }
  }

  if (!estaVacio(plazoAnios)) {
    if (
      !validarRangoNumero(
        "txtPlazo",
        "errorTxtPlazo",
        plazoAnios,
        1,
        5,
        "plazo",
      )
    ) {
      formularioValido = false;
    }

    if (!validarEntero("txtPlazo", "errorTxtPlazo", plazoAnios, "plazo")) {
      formularioValido = false;
    }
  }

  if (!estaVacio(tasaAnual)) {
    if (
      !validarRangoNumero(
        "txtTasaInteres",
        "errorTxtTasaInteres",
        tasaAnual,
        1,
        100,
        "tasa de interés",
      )
    ) {
      formularioValido = false;
    }
  }

  // Validación lógica adicional
  if (!estaVacio(ingresos) && !estaVacio(egresos)) {
    if (egresos > ingresos) {
      mostrarError(
        "txtEgresos",
        "errorTxtEgresos",
        "Los egresos no pueden ser mayores que los ingresos.",
      );
      formularioValido = false;
    }
  }

  if (!formularioValido) {
    return;
  }

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

function validarPaso1Mobile() {
  limpiarErroresFormulario();

  let ingresos = obtenerValores("mTxtIngresos");
  let egresos = obtenerValores("mTxtEgresos");

  let pasoValido = true;

  if (
    !validarRequeridoNumero(
      "mTxtIngresos",
      "errorMTxtIngresos",
      ingresos,
      "ingresos mensuales",
    )
  ) {
    pasoValido = false;
  }

  if (
    !validarRequeridoNumero(
      "mTxtEgresos",
      "errorMTxtEgresos",
      egresos,
      "egresos mensuales",
    )
  ) {
    pasoValido = false;
  }

  if (!estaVacio(ingresos)) {
    if (
      !validarRangoNumero(
        "mTxtIngresos",
        "errorMTxtIngresos",
        ingresos,
        1,
        100000,
        "ingresos mensuales",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!estaVacio(egresos)) {
    if (
      !validarRangoNumero(
        "mTxtEgresos",
        "errorMTxtEgresos",
        egresos,
        0,
        100000,
        "egresos mensuales",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!estaVacio(ingresos) && !estaVacio(egresos)) {
    if (egresos > ingresos) {
      mostrarError(
        "mTxtEgresos",
        "errorMTxtEgresos",
        "Los egresos no pueden ser mayores que los ingresos.",
      );
      pasoValido = false;
    }
  }

  if (!pasoValido) {
    return;
  }

  irPaso(2);
}

function validarPaso2Mobile() {
  limpiarError("mTxtMonto", "errorMTxtMonto");
  limpiarError("mTxtPlazo", "errorMTxtPlazo");
  limpiarError("mTxtTasaInteres", "errorMTxtTasaInteres");

  let montoSolicitado = obtenerValores("mTxtMonto");
  let plazoAnios = obtenerValores("mTxtPlazoValor");
  let tasaAnual = obtenerValores("mTxtTasaInteres");

  let pasoValido = true;

  if (
    !validarRequeridoNumero(
      "mTxtMonto",
      "errorMTxtMonto",
      montoSolicitado,
      "monto solicitado",
    )
  ) {
    pasoValido = false;
  }

  if (
    !validarRequeridoNumero("mTxtPlazo", "errorMTxtPlazo", plazoAnios, "plazo")
  ) {
    pasoValido = false;
  }

  if (
    !validarRequeridoNumero(
      "mTxtTasaInteres",
      "errorMTxtTasaInteres",
      tasaAnual,
      "tasa de interés",
    )
  ) {
    pasoValido = false;
  }

  if (!estaVacio(montoSolicitado)) {
    if (
      !validarRangoNumero(
        "mTxtMonto",
        "errorMTxtMonto",
        montoSolicitado,
        100,
        100000,
        "monto solicitado",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!estaVacio(plazoAnios)) {
    if (
      !validarRangoNumero(
        "mTxtPlazo",
        "errorMTxtPlazo",
        plazoAnios,
        1,
        5,
        "plazo",
      )
    ) {
      pasoValido = false;
    }

    if (!validarEntero("mTxtPlazo", "errorMTxtPlazo", plazoAnios, "plazo")) {
      pasoValido = false;
    }
  }

  if (!estaVacio(tasaAnual)) {
    if (
      !validarRangoNumero(
        "mTxtTasaInteres",
        "errorMTxtTasaInteres",
        tasaAnual,
        1,
        100,
        "tasa de interés",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!pasoValido) {
    return;
  }

  calcularMobile();
}

function calcularMobile() {
  limpiarErroresFormulario();

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
  mostrarEnPantalla("mSpnTotalSolicitud", formatearMoneda(montoSolicitado));
  mostrarEnPantalla("mSpnTotalInteres", formatearMoneda(montoInteres));
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

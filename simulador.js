function calcular() {
  limpiarErroresFormulario();

  let ingresos = obtenerValores("txtIngresos");
  let arriendo = obtenerValores("txtArriendo");
  let alimentacion = obtenerValores("txtAlimentacion");
  let varios = obtenerValores("txtVarios");

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
    !validarRequeridoNumero("txtArriendo", "errorTxtArriendo", arriendo, "")
  ) {
    formularioValido = false;
  }

  if (
    !validarRequeridoNumero(
      "txtAlimentacion",
      "errorTxtAlimentacion",
      alimentacion,
      "",
    )
  ) {
    formularioValido = false;
  }

  if (!validarRequeridoNumero("txtVarios", "errorTxtVarios", varios, "")) {
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

  if (!estaVacio(arriendo)) {
    if (
      !validarRangoNumero(
        "txtArriendo",
        "errorTxtArriendo",
        arriendo,
        0,
        100000,
        "arriendo",
      )
    ) {
      formularioValido = false;
    }
  }

  if (!estaVacio(alimentacion)) {
    if (
      !validarRangoNumero(
        "txtAlimentacion",
        "errorTxtAlimentacion",
        alimentacion,
        0,
        100000,
        "alimentación",
      )
    ) {
      formularioValido = false;
    }
  }

  if (!estaVacio(varios)) {
    if (
      !validarRangoNumero(
        "txtVarios",
        "errorTxtVarios",
        varios,
        0,
        100000,
        "varios",
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

  let egresos = arriendo + alimentacion + varios;
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

  let disponible = calcularDisponible(ingresos, egresos);
  let capacidadPago = calcularCapacidadPago(disponible);
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

  mostrarEnPantalla("spnEgresosTotales", formatearMoneda(egresos));
  mostrarEnPantalla("spnDisponible", formatearMoneda(disponible));
  mostrarEnPantalla("spnCapacidadPago", formatearMoneda(capacidadPago));
  mostrarEnPantalla("spnTotalSolicitud", formatearMoneda(montoSolicitado));
  mostrarEnPantalla("spnTotalInteres", formatearMoneda(montoInteres));
  mostrarEnPantalla("spnTotalSolca", "$100.00");
  mostrarEnPantalla("spnInteresPagar", formatearMoneda(montoInteres));
  mostrarEnPantalla("spnTotalPrestamo", formatearMoneda(totalPrestamo));
  mostrarEnPantalla("spnCuotaMensual", formatearMoneda(cuotaMensual));
}

function formatearMoneda(valor) {
  return "$" + Number(valor).toFixed(2);
}

function reiniciar() {
  obtenerTexto("txtIngresos").value = "";
  obtenerTexto("txtArriendo").value = "";
  obtenerTexto("txtAlimentacion").value = "";
  obtenerTexto("txtVarios").value = "";
  obtenerTexto("txtMonto").value = "";
  obtenerTexto("txtPlazo").value = "5";
  obtenerTexto("txtTasaInteres").value = "";

  mostrarEnPantalla("spnDisponible", "$0.00");
  mostrarEnPantalla("spnCapacidadPago", "$0.00");
  mostrarEnPantalla("spnInteresPagar", "$0.00");
  mostrarEnPantalla("spnTotalPrestamo", "$0.00");
  mostrarEnPantalla("spnCuotaMensual", "$0.00");
  mostrarEnPantalla("spnEstadoCredito", "ANALIZANDO");

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
  let arriendo = obtenerValores("mTxtArriendo");
  let alimentacion = obtenerValores("mTxtAlimentacion");
  let varios = obtenerValores("mTxtVarios");

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
      "mTxtArriendo",
      "errorMTxtArriendo",
      arriendo,
      "arriendo",
    )
  ) {
    pasoValido = false;
  }

  if (
    !validarRequeridoNumero(
      "mTxtAlimentacion",
      "errorMTxtAlimentacion",
      alimentacion,
      "alimentación",
    )
  ) {
    pasoValido = false;
  }

  if (
    !validarRequeridoNumero("mTxtVarios", "errorMTxtVarios", varios, "varios")
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

  if (!estaVacio(arriendo)) {
    if (
      !validarRangoNumero(
        "mTxtArriendo",
        "errorMTxtArriendo",
        arriendo,
        0,
        100000,
        "arriendo",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!estaVacio(alimentacion)) {
    if (
      !validarRangoNumero(
        "mTxtAlimentacion",
        "errorMTxtAlimentacion",
        alimentacion,
        0,
        100000,
        "alimentación",
      )
    ) {
      pasoValido = false;
    }
  }

  if (!estaVacio(varios)) {
    if (
      !validarRangoNumero(
        "mTxtVarios",
        "errorMTxtVarios",
        varios,
        0,
        100000,
        "varios",
      )
    ) {
      pasoValido = false;
    }
  }

  let egresos = arriendo + alimentacion + varios;

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
  let arriendo = obtenerValores("mTxtArriendo");
  let alimentacion = obtenerValores("mTxtAlimentacion");
  let varios = obtenerValores("mTxtVarios");

  let montoSolicitado = obtenerValores("mTxtMonto");
  let plazoAnios = obtenerValores("mTxtPlazoValor");
  let tasaAnual = obtenerValores("mTxtTasaInteres");

  let egresos = arriendo + alimentacion + varios;
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

  mostrarEnPantalla("mSpnIngresosTotales", formatearMoneda(ingresos));
  mostrarEnPantalla("mSpnEgresosTotales", formatearMoneda(egresos));
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
  obtenerTexto("mTxtArriendo").value = "";
  obtenerTexto("mTxtAlimentacion").value = "";
  obtenerTexto("mTxtVarios").value = "";
  obtenerTexto("mTxtMonto").value = "";
  obtenerTexto("mTxtTasaInteres").value = "";
  obtenerTexto("mTxtPlazoValor").value = "5";
  obtenerTexto("mTxtPlazo").value = "5 años";

  mostrarEnPantalla("mSpnEgresosTotales", "$0.00");
  mostrarEnPantalla("mSpnDisponible", "$0.00");
  mostrarEnPantalla("mSpnCapacidadPago", "$0.00");
  mostrarEnPantalla("mSpnInteresPagar", "$0.00");
  mostrarEnPantalla("mSpnTotalSolicitud", "$0.00");
  mostrarEnPantalla("mSpnTotalInteres", "$0.00");
  mostrarEnPantalla("mSpnTotalSolca", "$100.00");
  mostrarEnPantalla("mSpnTotalPrestamo", "$0.00");
  mostrarEnPantalla("mSpnCuotaMensual", "$0.00");
  mostrarEnPantalla("mSpnEstadoCredito", "ANALIZANDO");
  let boxEstado = obtenerTexto("state-box-mobile");
  boxEstado.classList.remove("info-box--aprobado", "info-box--rechazado");
  boxEstado.classList.add("info-box--analizando");

  irPaso(1);
}

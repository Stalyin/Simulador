function calcularDisponible(ingresos, egresos) {
  let valorDisponible = 0;
  valorDisponible = ingresos - egresos;

  if (valorDisponible < 0) {
    return 0;
  }

  return valorDisponible;
}

function calcularCapacidadPago(montoDisponible) {
  let capacidadPago = montoDisponible * 0.5;
  return capacidadPago;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
  let valorInteres = (plazoAnios * monto * tasa) / 100;
  return valorInteres;
}

function calcularTotalPagar(monto, interes) {
  let solca = 100;
  let totalPago = monto + interes + solca;

  return totalPago;
}

function calcularCuotaMensual(total, plazoAnios) {
  let valorMensual = total / (plazoAnios * 12);
  return valorMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  if (capacidadPago > cuotaMensual) {
    return true;
  }

  return false;
}

function obtenerValores(id) {
  return parseFloat(document.getElementById(id).value);
}

function obtenerValorEntero(id) {
  return parseInt(document.getElementById(id).value);
}

function obtenerTexto(id) {
  return document.getElementById(id);
}

function mostrarEnPantalla(id, valor) {
  document.getElementById(id).innerHTML = valor;
}

function limpiarError(idInput, idError) {
  let input = obtenerTexto(idInput);
  let error = obtenerTexto(idError);

  input.classList.remove("input-invalid");
  error.textContent = "";
}

function mostrarError(idInput, idError, mensaje) {
  let input = obtenerTexto(idInput);
  let error = obtenerTexto(idError);

  input.classList.add("input-invalid");
  error.textContent = mensaje;
}

function limpiarErroresFormulario() {
  // Desktop
  limpiarError("txtIngresos", "errorTxtIngresos");
  limpiarError("txtEgresos", "errorTxtEgresos");
  limpiarError("txtMonto", "errorTxtMonto");
  limpiarError("txtPlazo", "errorTxtPlazo");
  limpiarError("txtTasaInteres", "errorTxtTasaInteres");

  // Mobile
  limpiarError("mTxtIngresos", "errorMTxtIngresos");
  limpiarError("mTxtEgresos", "errorMTxtEgresos");
  limpiarError("mTxtMonto", "errorMTxtMonto");
  limpiarError("mTxtPlazo", "errorMTxtPlazo");
  limpiarError("mTxtTasaInteres", "errorMTxtTasaInteres");
}

function estaVacio(valor) {
  return valor === "" || valor === null || Number.isNaN(valor);
}

function validarRequeridoNumero(idInput, idError, valor, nombreCampo) {
  if (estaVacio(valor)) {
    mostrarError(
      idInput,
      idError,
      "El campo " + nombreCampo + " es obligatorio.",
    );
    return false;
  }

  return true;
}

function validarRangoNumero(
  idInput,
  idError,
  valor,
  minimo,
  maximo,
  nombreCampo,
) {
  if (valor < minimo || valor > maximo) {
    mostrarError(
      idInput,
      idError,
      "El campo " +
        nombreCampo +
        " debe estar entre " +
        minimo +
        " y " +
        maximo +
        ".",
    );
    return false;
  }

  return true;
}

function validarEntero(idInput, idError, valor, nombreCampo) {
  if (!Number.isInteger(valor)) {
    mostrarError(
      idInput,
      idError,
      "El campo " + nombreCampo + " debe ser un número entero.",
    );
    return false;
  }

  return true;
}

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

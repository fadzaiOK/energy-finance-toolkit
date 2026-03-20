export function calcNPV(rate, cashflows) {
  return cashflows.reduce(function (acc, cf, t) {
    return acc + cf / Math.pow(1 + rate, t);
  }, 0);
}

export function calcIRR(cashflows) {
  var rate = 0.1;
  for (var i = 0; i < 200; i++) {
    var npv = calcNPV(rate, cashflows);
    var dnpv = cashflows.reduce(function (acc, cf, t) {
      return acc - (t * cf) / Math.pow(1 + rate, t + 1);
    }, 0);
    if (Math.abs(dnpv) < 1e-12) break;
    var newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < 1e-8) {
      rate = newRate;
      break;
    }
    rate = newRate;
  }
  return rate;
}

export function calcWACC(debtRatio, interestRate, costOfEquity, taxRate) {
  var wd = debtRatio / 100;
  var we = 1 - wd;
  var rd = interestRate / 100;
  var re = costOfEquity / 100;
  var t = taxRate / 100;
  return we * re + wd * rd * (1 - t);
}

export function calcLCOE(inputs, currencyRate) {
  var capex = inputs.capacityMW * inputs.capexPerMW * currencyRate;
  var annualEnergy = inputs.capacityMW * (inputs.capacityFactor / 100) * 8760;
  var pv_energy = 0;
  var pv_cost = capex;
  var rate = inputs.discountRate / 100;
  for (var y = 1; y <= inputs.projectLife; y++) {
    var energy = annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
    var opex = inputs.capacityMW * inputs.opexPerMW * currencyRate;
    pv_energy += energy / Math.pow(1 + rate, y);
    pv_cost += opex / Math.pow(1 + rate, y);
  }
  return pv_energy > 0 ? pv_cost / pv_energy : 0;
}

export var fmt = {
  M: function (v) {
    return v == null ? "-" : "$" + (v / 1e6).toFixed(2) + "M";
  },
  pct: function (v) {
    return v == null ? "-" : (v * 100).toFixed(1) + "%";
  },
  x: function (v) {
    return v == null ? "-" : v.toFixed(2) + "x";
  },
  yr: function (v) {
    return v == null ? "-" : v + " yrs";
  },
};

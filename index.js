"use strict";
//Dom Elements
const unitType = document.getElementById("unit-type");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const swapBtn = document.getElementById("swap-btn");

// Unit Data
const unitData = {
  length: {
    baseUnit: "meter",
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
    },
  },
  weight: {
    baseUnit: "kilogram",
    units: {
      gram: 0.001,
      kilogram: 1,
      milligram: 0.000001,
      pound: 0.453592,
      ounce: 0.0283495,
    },
  },
  volume: {
    baseUnit: "liter",
    units: {
      milliliter: 0.001,
      liter: 1,
      cubic_meter: 1000,
      gallon: 3.78541,
      pint: 0.473176,
      cup: 0.24,
    },
  },
  temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
  },
};

// Populate Unit Types
function populateUnits() {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  const type = unitType.value;
  if (type === "temperature") {
    unitData.temperature.units.forEach((u) => addOption(u));
  } else {
    Object.keys(unitData[type].units).forEach((u) => addOption(u));
  }
  convertUnits();
}

function addOption(unit) {
  const option1 = document.createElement("option");
  option1.value = unit;
  option1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
  fromUnit.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = unit;
  option2.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
  toUnit.appendChild(option2);
}

window.addEventListener("load", populateUnits);
unitType.addEventListener("change", populateUnits);

// Conversion Logic
function convertNormalUnits(amount, from, to, type) {
  const units = unitData[type].units;
  const amountInBase = amount * units[from];
  return amountInBase / units[to];
}

function convertTemperature(amount, from, to) {
  let tempInCelsius;
  switch (from) {
    case "Celsius":
      tempInCelsius = amount;
      break;
    case "Fahrenheit":
      tempInCelsius = (amount - 32) * (5 / 9);
      break;
    case "Kelvin":
      tempInCelsius = amount - 273.15;
      break;
  }
  switch (to) {
    case "Celsius":
      return tempInCelsius;
    case "Fahrenheit":
      return tempInCelsius * (9 / 5) + 32;
    case "Kelvin":
      return tempInCelsius + 273.15;
  }
}

//Convert & Display Result
function convertUnits() {
  const amount = parseFloat(amountInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  const type = unitType.value;
  if (isNaN(amount)) {
    resultDiv.textContent = "Please enter a valid number.";
    return;
  }
  let result;
  if (type === "temperature") {
    result = convertTemperature(amount, from, to);
  } else {
    result = convertNormalUnits(amount, from, to, type);
  }
  resultDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

//Live Conversion
amountInput.addEventListener("input", convertUnits);
fromUnit.addEventListener("change", convertUnits);
toUnit.addEventListener("change", convertUnits);
unitType.addEventListener("change", convertUnits);

//Swap Units
swapBtn.addEventListener("click", () => {
  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  convertUnits();
});

// Elements
const operarBtn = document.getElementById("operarBtn");
const resultat = document.getElementById("resultat");

const inputUsername = document.getElementById("username");
const inputOperand1 = document.getElementById("operand1");
const inputOperand2 = document.getElementById("operand2");
const inputOperand3 = document.getElementById("operand3");

// Main
operarBtn.addEventListener("click", () => {
  const username = inputUsername.value.trim();
  const operand1 = inputOperand1.value.trim();
  const operand2 = inputOperand2.value.trim();
  const operand3 = inputOperand3.value.trim();

  if (!username) {
    mostrarToast("El usuari és obligatori.");
    return;
  }

  if (!operand1 || !operand2) {
    mostrarToast("Els camps 'operand1' i 'operand2' són obligatoris.");
    return;
  }

  // determina tipus
  const operands = [operand1, operand2, operand3].filter(Boolean);
  const allNumeric = operands.every((value) => !isNaN(value));

  let resultatFinal;

  if (allNumeric) {
    // Suma
    resultatFinal = parseFloat(operand1) + parseFloat(operand2);

    if (operand3) {
      resultatFinal += parseFloat(operand3);
    }
    
  } else {
    // Concat
    resultatFinal = operands.join("");
  }

  resultat.value = resultatFinal;

  // Actualitza historial
  const operacioHistorial = getHistorial();
  const operacioKey = `${operand1}|${operand2}|${operand3}`;

  // Comproba si s'ha fet abanss
  if (operacioHistorial[operacioKey]) {
    const previousUser = operacioHistorial[operacioKey];
    mostrarToast(`Operació realitzada anteriorment per: ${previousUser}`);
  }

  // Guarda operació
  operacioHistorial[operacioKey] = username;
  saveHistorial(operacioHistorial);
});

// FUNCIONS
const getHistorial = () => {
  const historial = localStorage.getItem("operacionsHistorial");
  return historial ? JSON.parse(historial) : {};
};

const saveHistorial = (historial) => {
  localStorage.setItem("operacionsHistorial", JSON.stringify(historial));
};

const mostrarToast = (missatge) => {
  Toastify({
    text: missatge,
    duration: 3500,
  }).showToast();
};

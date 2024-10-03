// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
    class: "low",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
    class: "good",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
    class: "low",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
    class: "medium",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
    class: "high",
  },
];

// Seleção de Elementos

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const backBtn = document.querySelector("#back-btn");
const imcTable = document.querySelector("#imc-table");
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const img = document.querySelector("img");
const footer = document.querySelector("#footer");
const footerName = document.querySelector("#footer span");
const descriptionDev = document.querySelector("#description-dev");
const container = document.querySelector(".container");
const restart = document.querySelector("#restart");

// Funções

const createTable = (data) => {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
  heightInput.focus();
};

const calcImc = (height, weight) => {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
};

const showOrHideResults = () => {
  resultContainer.classList.toggle("hide");
  calcContainer.classList.toggle("hide");
  img.classList.toggle("hide");
  footer.classList.toggle("hide");
};

const clearInputs = () => {
  heightInput.value = "";
  weightInput.value = "";
  heightInput.focus();
  imcNumber.classList = "";
  imcInfo.classList = "";
};

const validDigits = (text) => {
  return text.replace(/[^,0-9]/g, "");
};

const restartAll = () => {
  descriptionDev.classList.add("hide");
  container.classList.remove("hide");
  footer.classList.add("hide");
  calcContainer.classList.remove("hide");
  resultContainer.classList.add("hide");
  img.classList.remove("hide");
};

// Inicialização

createTable(data);

// Eventos

[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  heightInput.focus();
  const height = heightInput.value.replace(",", ".");
  const weight = weightInput.value.replace(",", ".");

  if (!height || !weight) {
    Swal.fire({
      icon: "info",
      title: "Preenchimento Obrigatório!",
      text: "É necessário preencher todos os dados antes de prosseguir!",
    });
    clearInputs();
    return;
  }
  const imc = calcImc(height, weight);

  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) {
    Swal.fire({
      icon: "info",
      title: "Preenchimento Inválido!",
      text: "É necessário preencher um valor real antes de prosseguir!",
    });
    clearInputs();
    return;
  }

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;

    case "Sobrepeso":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;

    case "Obesidade":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showOrHideResults();
  clearInputs();
});

footerName.addEventListener("click", () => {
  Swal.fire({
    icon: "info",
    title: "Você me encontrou!",
    text: "Clique em Ok para prosseguir!",
  });

  descriptionDev.classList.remove("hide");
  descriptionDev.classList.add("show");
  container.classList.add("hide");
  footer.classList.toggle("hide");
});

restart.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputs();

  restartAll();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputs();
});

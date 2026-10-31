const countInput = document.querySelector("#deal-count");
const feeInput = document.querySelector("#fee-per-deal");
const expensesInput = document.querySelector("#expenses");

const salesOutput = document.querySelector("#sales-total");
const expensesOutput = document.querySelector("#expenses-total");
const profitOutput = document.querySelector("#estimated-profit");
const marginOutput = document.querySelector("#profit-margin");

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  maximumFractionDigits: 0
});

function readAmount(input) {
  const amount = Number(input.value);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function formatYen(amount) {
  return `${yenFormatter.format(Math.round(amount))}円`;
}

function calculate() {
  const count = readAmount(countInput);
  const feePerDeal = readAmount(feeInput);
  const expenses = readAmount(expensesInput);

  const sales = count * feePerDeal;
  const profit = sales - expenses;
  const margin = sales > 0 ? (profit / sales) * 100 : 0;

  salesOutput.textContent = formatYen(sales);
  expensesOutput.textContent = formatYen(expenses);
  profitOutput.textContent = formatYen(profit);
  marginOutput.textContent = `${margin.toFixed(1)}%`;

  profitOutput.classList.remove("is-positive", "is-negative", "is-zero");
  if (profit > 0) {
    profitOutput.classList.add("is-positive");
  } else if (profit < 0) {
    profitOutput.classList.add("is-negative");
  } else {
    profitOutput.classList.add("is-zero");
  }
}

[countInput, feeInput, expensesInput].forEach((input) => {
  input.addEventListener("input", calculate);
});

calculate();

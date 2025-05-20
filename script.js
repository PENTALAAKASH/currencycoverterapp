const apiKey = "fca_live_9sUMgFfN018sr35d3f8D1AYiIT1IEEBD5604JLrh";  // Replace with your actual FreeCurrencyAPI key
const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

async function populateCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.data);

    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    currencies.forEach(currency => {
      fromCurrency.appendChild(new Option(currency, currency));
      toCurrency.appendChild(new Option(currency, currency));
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  } catch (error) {
    alert("Could not load currencies. Please check your API key or internet connection.");
  }
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultEl = document.getElementById("result");

  if (isNaN(amount) || amount <= 0) {
    resultEl.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${from}`);
    const data = await response.json();
    const rate = data.data[to];
    const converted = (amount * rate).toFixed(2);
    resultEl.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultEl.innerText = "Conversion failed.";
  }
}

window.onload = populateCurrencies;

let elements = [];
let current = null;
let interval = null;

async function loadElements() {
  const response = await fetch("elements.json");
  elements = await response.json();
}

async function startRandom() {
  if (interval !== null) return;
  if (elements.length === 0) await loadElements();
  document.getElementById("name").textContent = "";
  interval = setInterval(() => {
    current = elements[Math.floor(Math.random() * elements.length)];
    document.getElementById("symbol").textContent = current.symbol;
  }, 50);
}

function stopRandom() {
  clearInterval(interval);
  interval = null;
}

function showAnswer() {
  if (current) {
    document.getElementById("name").textContent = current.name;
  }
}

function resetRandom() {
  clearInterval(interval);
  interval = null;
  current = null;
  document.getElementById("symbol").textContent = "?";
  document.getElementById("name").textContent = "";
  const infoBox = document.getElementById("element-info");
  infoBox.innerHTML = `<h2>Element Information</h2><p>Select an element and click "Show Information" to see details here.</p>`;
  infoBox.style.display = "none";
}

function toggleInfo() {
  const infoSection = document.getElementById("element-info");
  if (!current) {
    alert("Please select an element first!");
    return;
  }
  if (
    infoSection.style.display === "none" ||
    infoSection.style.display === ""
  ) {
    infoSection.innerHTML = `<h2>${current.name} (${current.symbol})</h2><p>${current.info}</p>`;
    infoSection.style.display = "block";
  } else {
    infoSection.style.display = "none";
  }
}

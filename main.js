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
  // ซ่อน element-info ทุกครั้งที่เริ่มสุ่ม
  const infoSection = document.getElementById("element-info");
  infoSection.innerHTML = "";
  infoSection.style.display = "none";
  interval = setInterval(() => {
    current = elements[Math.floor(Math.random() * elements.length)];
    document.getElementById("symbol").textContent = current.symbol;
  }, 50);
}

function stopRandom() {
  clearInterval(interval);
  interval = null;
  // ไม่ต้องแสดง info อัตโนมัติ ให้ผู้ใช้กด Show Information เอง
}

function showAnswer() {
  // ไม่อนุญาตให้ Reveal ระหว่างสุ่ม
  if (interval !== null) return;
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
  infoBox.innerHTML = "";
  infoBox.style.display = "none";
}

function toggleInfo() {
  // ไม่อนุญาตให้ Show Information ระหว่างสุ่ม
  if (interval !== null) return;
  const infoSection = document.getElementById("element-info");
  if (!current) {
    infoSection.innerHTML = "";
    infoSection.style.display = "none";
    return;
  }
  if (
    infoSection.style.display === "none" ||
    infoSection.style.display === ""
  ) {
    if (current.info) {
      infoSection.innerHTML = `<h2>${current.name} (${current.symbol})</h2><p>${current.info}</p>`;
      infoSection.style.display = "block";
    } else {
      infoSection.innerHTML = "";
      infoSection.style.display = "none";
    }
  } else {
    infoSection.style.display = "none";
  }
}

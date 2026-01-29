let budget = 0;
let total = 0;

window.onload = () => {
  const logs =JSON.parse(localStorage.getItem("logs-" + monthKey)) || [];

  logs.forEach(log => {
    addLogToScreen(log.time, log.item, log.amount, false);
    total += log.amount;
  });

  if (budget > 0) {
    document.getElementById("remaining").textContent = budget - total;
    document.getElementById("budgetArea").style.display = "none";
  } else {
    document.getElementById("remaining").textContent = "未設定";
  }
};

function settei() {
  budget = Number(document.getElementById("budgetInput").value);
  document.getElementById("remaining").textContent = budget;
  document.getElementById("budgetArea").style.display = "none";
}

function tuika() {
  const item = document.getElementById("item").value;
  const amount = Number(document.getElementById("amount").value);

  if (!item || !amount) return;

  total += amount;
  document.getElementById("remaining").textContent = budget - total;

  const now = new Date();
  const time =
    now.getFullYear() + "/" +
    (now.getMonth() + 1) + "/" +
    now.getDate() + " " +
    now.getHours() + ":" +
    now.getMinutes().toString().padStart(2, "0");

  const li = document.createElement("li");
  li.textContent = `${time}｜${item}：${amount}円`;

  const list = document.getElementById("list");
  list.prepend(li);

  document.getElementById("item").value = "";
  document.getElementById("amount").value = "";
}
const calendar = document.getElementById("calendar");
const calendarTitle = document.getElementById("calendarTitle");

function createCalendar(year, month) {
  calendar.innerHTML = "";
  calendarTitle.textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= lastDate; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;
    cell.className = "day";

    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    cell.onclick = () => showLogsByDate(dateStr);

    calendar.appendChild(cell);
  }
}
const atara = new Date();
const monthKey =now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");

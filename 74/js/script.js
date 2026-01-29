
const today = new Date();
const monthKey =
  today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2,"0");

let logs = JSON.parse(localStorage.getItem("logs-" + monthKey)) || [];
let budget = Number(localStorage.getItem("budget-" + monthKey)) || 0;
let selectedDate = today.toISOString().slice(0, 10); 

window.onload = () => {
  createCalendar(today.getFullYear(), today.getMonth());
  updateSelectedDate(selectedDate);
  renderLogs(logs);
  if (budget > 0) {
    document.getElementById("remaining").textContent = budget - getTotal(logs);
    document.getElementById("budgetArea").style.display = "none";
  }
};

function settei() {
  budget = Number(document.getElementById("budgetInput").value);
  if (!budget) return;
  localStorage.setItem("budget-" + monthKey, budget);
  document.getElementById("budgetArea").style.display = "none";
  renderLogs(logs);
}

function tuika() {
  const item = document.getElementById("item").value;
  const amount = Number(document.getElementById("amount").value);
  if (!item || !amount) return;

  const now = new Date();
  const log = {
    date: now.toISOString().slice(0,10),
    time: now.getHours() + ":" + String(now.getMinutes()).padStart(2,"0"),
    item,
    amount
  };

  logs.push(log);
  saveLogs();
  renderLogs(logs);

  document.getElementById("item").value = "";
  document.getElementById("amount").value = "";
}

function saveLogs() {
  localStorage.setItem("logs-" + monthKey, JSON.stringify(logs));
}

function getTotal(target) {
  return target.reduce((sum, log) => sum + log.amount, 0);
}

function renderLogs(targetLogs) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  targetLogs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = `${log.time}｜${log.item}：${log.amount}円`;
    list.prepend(li);
  });

  document.getElementById("remaining").textContent =
    budget ? budget - getTotal(targetLogs) : "---";
}

function showByDate(date) {
  const filtered = logs.filter(log => log.date === date);
  renderLogs(filtered);
}

function createCalendar(year, month) {
  const cal = document.getElementById("calendar");
  const title = document.getElementById("calendarTitle");
  cal.innerHTML = "";
  title.textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    cal.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= lastDate; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = d;

    const dateStr =
      year + "-" +
      String(month + 1).padStart(2,"0") + "-" +
      String(d).padStart(2,"0");

    cell.onclick = () => 
      updateSelectedDate(dateStr);
      showByDate(dateStr);
    cal.appendChild(cell);
  }
}

function resetStorage() {
  if (!confirm("今月の予算と記録をすべて削除します。本当によろしいですか？")) {
    return;
  }

  // 今月分だけ削除
  localStorage.removeItem("logs-" + monthKey);
  localStorage.removeItem("budget-" + monthKey);

  // 画面も初期化
  logs = [];
  budget = 0;

  document.getElementById("list").innerHTML = "";
  document.getElementById("remaining").textContent = "---";
  document.getElementById("budgetArea").style.display = "block";

  alert("今月のデータをリセットしました");
}

function updateSelectedDate(date) {
  selectedDate = date;

  const d = new Date(date);
  document.getElementById("selectedDate").textContent =
    d.getFullYear() + "年" +
    (d.getMonth() + 1) + "月" +
    d.getDate() + "日";
}

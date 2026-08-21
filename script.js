function addRow() {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td></td>
    <td><input type="text" placeholder="工作項目名稱"></td>
    <td><textarea placeholder="詳細說明或注意事項"></textarea></td>
    <td><input type="date"></td>
    <td><input type="text" placeholder="備註"></td>
    <td><button class="del-btn" onclick="this.closest('tr').remove(); renumber()">刪除</button></td>
  `;
  document.getElementById('task-body').appendChild(tr);
  renumber();
}

function renumber() {
  document.querySelectorAll('#task-body tr').forEach((tr, i) => {
    tr.cells[0].textContent = i + 1;
  });
}

// 預設 3 列
addRow(); addRow(); addRow();

// 一、二、四區塊欄位跨次沿用（data-persist）；交接事項與簽核欄每次不同，不保存
const STORAGE_KEY = 'leave-handover-form';
const persistFields = document.querySelectorAll('[data-persist]');

let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
} catch (e) {}

persistFields.forEach((el) => {
  el.value = saved[el.dataset.persist] ?? '';
  el.addEventListener('input', savePersistFields);
});

function savePersistFields() {
  const data = {};
  persistFields.forEach((el) => {
    data[el.dataset.persist] = el.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

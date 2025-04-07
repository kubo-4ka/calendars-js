// 表示できる年の最小と最大
const MIN_YEAR = 1970;
const MAX_YEAR = 2069;

// 現在の日付（今日）を取得して変数に保存
let currentDate = new Date();

// HTML内の各要素をJavaScriptで操作できるように取得
const yearSelect = document.getElementById('yearSelect');
const monthSelect = document.getElementById('monthSelect');
const calendar = document.getElementById('calendar');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const todayBtn = document.getElementById('todayBtn');

// 年のセレクトボックスに1970〜2069を追加
for (let y = MIN_YEAR; y <= MAX_YEAR; y++) {
  const option = document.createElement('option');
  option.value = y;              // 値として数値を設定
  option.textContent = y + '年'; // 表示される文字
  yearSelect.appendChild(option);
}

// 月のセレクトボックスに1〜12月を追加（内部的には0〜11で扱う）
for (let m = 0; m < 12; m++) {
  const option = document.createElement('option');
  option.value = m;
  option.textContent = (m + 1) + '月';
  monthSelect.appendChild(option);
}

// 年と月をセットしてカレンダーを更新する関数
function setYearMonthAndUpdate(year, month) {
  yearSelect.value = year;
  monthSelect.value = month;
  updateCalendar();
}

// カレンダーを表示する関数（メイン処理）
function updateCalendar() {
  const year = parseInt(yearSelect.value);   // 選ばれている年
  const month = parseInt(monthSelect.value); // 選ばれている月（0〜11）

  // 対象月の1日と月末日を作成
  const firstDay = new Date(year, month, 1);         // その月の1日
  const lastDay = new Date(year, month + 1, 0);      // その月の最終日（次月の0日）

  const startDay = firstDay.getDay(); // 何曜日から始まるか（日曜=0）

  // カレンダー表示部分を一度クリア
  calendar.innerHTML = '';

  // 月の最初の曜日に合わせて空白セルを追加（例：水曜始まりなら3個）
  for (let i = 0; i < startDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  // 日付セルを順に追加（1日〜末日）
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const cell = document.createElement('div');
    cell.textContent = d; // セルに日付を表示

    // 今日と一致する日付なら、クラスを追加してハイライト
    const isToday =
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth() &&
      d === currentDate.getDate();

    if (isToday) {
      cell.classList.add('today'); // today クラス（style.cssで装飾）
    }

    calendar.appendChild(cell); // カレンダーに追加
  }

  // 前月・次月ボタンの有効／無効状態を更新
  updateNavigationButtons(year, month);
}

// ← → ボタンが押せるかを判定し、押せないときは見た目を無効化
function updateNavigationButtons(year, month) {
  // 最小範囲（1970年1月）なら←ボタンを無効
  prevBtn.disabled = (year === MIN_YEAR && month === 0);

  // 最大範囲（2069年12月）なら→ボタンを無効
  nextBtn.disabled = (year === MAX_YEAR && month === 11);
}

// 「前月」ボタンを押したときの処理
prevBtn.addEventListener('click', () => {
  let year = parseInt(yearSelect.value);
  let month = parseInt(monthSelect.value);

  if (month === 0) {
    year--;     // 1月 → 前の年の12月へ
    month = 11;
  } else {
    month--;    // 前の月へ
  }

  setYearMonthAndUpdate(year, month);
});

// 「翌月」ボタンを押したときの処理
nextBtn.addEventListener('click', () => {
  let year = parseInt(yearSelect.value);
  let month = parseInt(monthSelect.value);

  if (month === 11) {
    year++;     // 12月 → 次の年の1月へ
    month = 0;
  } else {
    month++;    // 次の月へ
  }

  setYearMonthAndUpdate(year, month);
});

// 「Today」ボタンを押したときの処理
todayBtn.addEventListener('click', () => {
  // 現在の日付を取得し直して、表示する年月を更新
  currentDate = new Date();
  setYearMonthAndUpdate(currentDate.getFullYear(), currentDate.getMonth());
});

// 年または月を選択したとき、カレンダーを更新
yearSelect.addEventListener('change', () => {
  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);
  setYearMonthAndUpdate(year, month);
});

monthSelect.addEventListener('change', () => {
  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);
  setYearMonthAndUpdate(year, month);
});

// 最初にページを開いたときの処理（現在の年月を表示）
window.addEventListener('load', () => {
  setYearMonthAndUpdate(currentDate.getFullYear(), currentDate.getMonth());
});

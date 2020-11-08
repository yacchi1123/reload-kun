const getTimeUnit = () => {
  // form要素取得
  const target = document.getElementById('setting-unit');

  // form要素内のラジオボタングループを取得
  const radioNodeList = target.unit;

  // 選択状態の値(value)を取得
  const selectedUnit = radioNodeList.value;

  return selectedUnit;
}

// 登録ボタンクリックしたときの処理
document.getElementById('add-btn').addEventListener('click', () => {
  const sendData = {
    status: 'add',
    time: document.getElementById('setting-time').value,
    unit: getTimeUnit()
  }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(sendData));
    window.close();
  });
});

// 解除ボタンクリックしたときの処理
document.getElementById('cancel-btn').addEventListener('click', () => {
  const sendData = {
    status: 'cancel'
  }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(sendData));
    window.close();
  });
});

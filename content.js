// タイマー
let reloadTimer;

const setTimer = (timer) => {
  reloadTimer = setInterval(executeReload, timer);
}

const cancelTimer = () => {
  clearInterval(reloadTimer);
}

const executeReload = () => {
  location.reload();
}

chrome.runtime.onMessage.addListener((msgJson) => {

  if (!msgJson) {
    sendResponse('error');
    return;
  }

  const msgObj = JSON.parse(msgJson);

  if (msgObj.status === 'add') {
    const time = Number.parseFloat(msgObj.time);
    const unit = msgObj.unit;
    const url = location.href;
    let timer;
    if (unit === 'sec') {
      // s => ms
      timer = time * 1000;
    } else if (unit === 'min') {
      // min => ms
      timer = time * 60 * 1000;
    } else if (unit === 'hour') {
      // hour => ms
      timer = time * 60 * 60 * 1000;
    }
    localStorage.setItem('timer', timer);
    localStorage.setItem('url', url);
    setTimer(timer);
  } else if (msgObj.status === 'cancel') {
    cancelTimer();
    localStorage.removeItem('timer');
    localStorage.removeItem('url');
  }

  return;

});

window.onload = () => {
  const url = localStorage.getItem('url');
  const timer = localStorage.getItem('timer');
  if (!timer || url !== location.href) {
    return;
  }
  setTimer(timer);
};
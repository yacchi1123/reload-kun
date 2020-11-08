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
    setTimer(timer);
  } else if (msgObj.status === 'cancel') {
    cancelTimer();
    localStorage.removeItem('timer');
  }

  return;

});

window.onload = () => {
  const timer = localStorage.getItem('timer');
  if (!timer) {
    return;
  }
  setTimer(timer);
};
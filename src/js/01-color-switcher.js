function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function changeBackgroundColor() {
  var body = document.body;
  body.style.backgroundColor = getRandomHexColor();
}

function startChanging() {
  var start = document.querySelector('[data-start]');
  start.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChanging() {
  clearInterval(intervalId);
  var start = document.querySelector('[data-start]');
  start.disabled = false;
}

document.addEventListener('DOMContentLoaded', function () {
  var start = document.querySelector('[data-start]');
  var stop = document.querySelector('[data-stop]');

  start.addEventListener('click', startChanging);
  stop.addEventListener('click', stopChanging);
});

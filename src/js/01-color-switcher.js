var intervalId;

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
  var stop = document.querySelector('[data-stop]');

  start.disabled = true;
  stop.disabled = false;

  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChanging() {
  clearInterval(intervalId);
  var start = document.querySelector('[data-start]');
  var stop = document.querySelector('[data-stop]');

  start.disabled = false;
  stop.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
  var start = document.querySelector('[data-start]');
  var stop = document.querySelector('[data-stop]');

  stop.disabled = true;

  start.addEventListener('click', startChanging);
  stop.addEventListener('click', stopChanging);
});

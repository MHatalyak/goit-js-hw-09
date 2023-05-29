import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let countdownIntervalId;

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay(time) {
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

function startCountdown() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  startButton.disabled = true;

  // Встановлення години на початок дня (0 годин) для обраних дат
  selectedDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const selectedUtcDate = Date.UTC(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    selectedDate.getHours(),
    selectedDate.getMinutes(),
    selectedDate.getSeconds()
  );

  const currentUtcDate = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  );

  let timeDifference = selectedUtcDate - currentUtcDate;

  function updateCountdown() {
    timeDifference -= 1000;

    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      startButton.disabled = false;
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      return;
    }

    const time = convertMs(timeDifference);
    updateTimerDisplay(time);
  }

  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      instance.setDate(currentDate, false);
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', startCountdown);

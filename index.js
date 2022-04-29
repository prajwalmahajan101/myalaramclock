const display = document.getElementById("clock");

const updateTime = () => {
  const date = new Date();

  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  display.innerText = `${hour} : ${minutes} : ${seconds}`;
};

const formatTime = (time) => {
  if (time < 10) {
    return "0" + time;
  }
  return time;
};

setInterval(updateTime, 1000);

const display = document.getElementById("clock");
const list = document.getElementById("alarmList");
const timeControl = document.querySelector('input[type="time"]');

const AlarmList = [
  ["06", "00"],
  ["07", "00"],
];

const updateAlarmList = () => {
  let data = "";
  for (i of AlarmList) {
    data += "<li>" + i[0] + " hr " + i[1] + " min " + "</li>";
  }

  list.innerHTML = "<ul>" + data + "</ul>";
};
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

updateAlarmList();

setInterval(updateTime, 1000);

const submitHandler = () => {
  const value = timeControl.value;
  console.log(value);
};

const display = document.getElementById("clock");
const list = document.getElementById("alarmList");
const timeControl = document.querySelector('input[type="time"]');

// Audio for Alarm
const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);

// loop
audio.loop = true;

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

  if (checkList([hour, minutes])) audio.play();
  else audio.pause();

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
  if (value == "") return;
  const hr = value[0] + value[1];
  const min = value[3] + value[4];

  const newAlarm = [hr, min];
  if (checkList(newAlarm)) return;
  AlarmList.push(newAlarm);
  updateAlarmList();
  //   console.log(hr + " : " + min);
};

const checkList = (data) => {
  for (let el of AlarmList) {
    if (el[0] == data[0] && el[1] == data[1]) return true;
  }
  return false;
};

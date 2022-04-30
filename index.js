const display = document.getElementById("clock");
const button = document.getElementById("alarmButton");

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
  let k = 0;
  if (AlarmList.length == 0) {
    list.innerHTML = "<h3>NO Alarm Set Till Now</h3>";
    return;
  }
  for (i of AlarmList) {
    data +=
      "<li id='" +
      k +
      "' onclick='alarmDelete(this.id)'>" +
      i[0] +
      " hr " +
      i[1] +
      " min " +
      "</li>";
    k++;
  }

  list.innerHTML = "<ul>" + data + "</ul>";
};
const updateTime = () => {
  const date = new Date();

  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  if (checkList([hour, minutes])) {
    audio.play();
    setButton();
  } else {
    audio.pause();
    removeButton();
  }

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

const alarmDelete = (index) => {
  //   console.log(index);

  if (confirm("Do You want to delete this alarm :")) {
    AlarmList.splice(index, 1);
    //   console.log(AlarmList);
    updateAlarmList();
  } else return;
};

const clearHandler = () => {
  audio.pause();
  const date = new Date();
  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());

  for (let i = 0; i < AlarmList.length; i++) {
    if (AlarmList[i][0] == hour && AlarmList[i][1] == minutes) {
      AlarmList.splice(i, 1);
    }
  }
  updateAlarmList();
  removeButton();
};

const snoozeHandler = () => {
  audio.pause();
  const date = new Date();
  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  for (let i = 0; i < AlarmList.length; i++) {
    if (AlarmList[i][0] == hour && AlarmList[i][1] == minutes) {
      console.log(typeof AlarmList[i][1]);
      let temp = parseInt(AlarmList[i][1]);
      console.log(typeof temp + " " + temp);
      temp += 5;
      temp += "";
      AlarmList[i][1] = temp;
    }
  }
  updateAlarmList();

  removeButton();
};

const setButton = () => {
  button.innerHTML =
    '<button class="controls" onclick="clearHandler()">Stop alarm</button><button class="controls" onclick="snoozeHandler()">Snooze alarm</button>';
};
const removeButton = () => {
  button.innerHTML = "";
};

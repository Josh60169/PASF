let timer = document.getElementById("timer-time");
let timerMethod="standard";
let alarmSound;
let startBtn =  document.getElementById("start-btn");
let stopBtn =  document.getElementById("stop-btn");
stopBtn.disabled = true;

const customBtnClick = () => {
    document.getElementById("customInputBox").style.visibility = "visible";
};

// Implements the customized settings given from the user
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    //timerMethod = document.querySelector('input[name="radAns"]:checked').id;

    setTimer(document.querySelector('input[name="cust-hrs"]').value, document.querySelector('input[name="cust-mins"]').value, document.querySelector('input[name="cust-secs"]').value);
});

// Variables for managing the timer
let timerFlag;
let countDownID;
let stopTimerID;
let alarmFlag;

// Starts the timer countdown
const startTimer = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerFlag = false;
    alarmFlag = false;

    if (timerMethod === "standard") {
            countDownID = setInterval(countDownTimer, 1000)
            stopTimerID = setInterval(stopTimer, 100);
    }
};

// Makes the timer count down
const countDownTimer = () => {
    let time = document.getElementById("timer-time").innerText.split(":");

    if (parseInt(time[2]) !== 0) {
        setTimer(parseInt(time[0]), parseInt(time[1]), parseInt(time[2] - 1));
    } else if (parseInt(time[1]) !== 0) {
        setTimer(parseInt(time[0]), parseInt(time[1] - 1),59);
    } else if (parseInt(time[0]) !== 0) {
        setTimer(parseInt(time[0] - 1), 59, 59)
    } else {
        timerFlag = true;
        timerAlarm();
    }
};

// Sets the time on the timer display
const setTimer = (hrs, mins, secs) => {
    // adjusts the hrs, mins, and secs to be in proper format (ex: not 90 secs but 1 min and 30 secs)
    if (Math.trunc(parseInt(mins) / 60) !== 0) {
        let addToHours = Math.trunc(parseInt(mins) / 60);
        hrs = Math.trunc(parseInt(hrs) + addToHours);
        mins = Math.trunc(parseInt(mins) % 60);
    }

    let newHrs = '';
    let newMins = '';
    let newSecs = '';

    if (hrs === 0)
        newHrs = '00';
    else if (hrs < 10)
        newHrs = `0${hrs}`;
    else
       newHrs = `${hrs}`;

    if (mins === 0)
        newMins = '00';
    else if (mins < 10)
        newMins = `0${mins}`;
    else
       newMins = `${mins}`;

    if (secs === 0)
        newSecs = '00';
    else if (secs < 10)
        newSecs = `0${secs}`;
    else
        newSecs = `${secs}`;

    timer.innerText = `${newHrs}:${newMins}:${newSecs}`;
};

const stopTimer = () => {
    if (timerFlag) {
        clearInterval(countDownID);
        clearInterval(stopTimerID);
    }
};

const stopBtnClicked = () => {
    timerFlag = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;

    if (alarmFlag) {
        alarmFlag = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
};

const timerAlarm = () => {
    alarmFlag = true;
    console.log(alarmSound);
    alarmSound = new Audio("./assets/audio/alarmSound.wav");
    alarmSound.loop = true;
    alarmSound.play();
};
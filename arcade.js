let timer = document.getElementById("timer-time");
let timerMethod="standard";
let alarmSound;
let startBtn = document.getElementById("arcade-start-btn");
let stopBtn = document.getElementById("arcade-stop-btn");
stopBtn.disabled = true;

let timeAmount = 0; // Amount of time on timer in minutes

// Adds 1 minute if add 1 minute button is clicked
document.querySelector("#arcade-addMin-btn").addEventListener("click", (event) => {
    event.preventDefault();

    timeAmount++;
    setTimer(0, timeAmount, 0);
});

// clears timer if clear button is clicked
document.querySelector("#arcade-clear-btn").addEventListener("click", (event) => {
    event.preventDefault();

    timeAmount = 0;
    setTimer(0, timeAmount, 0);
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
        setTimer(parseInt(time[0]), parseInt(time[1]), parseInt(time[2]) - 1);
    } else if (parseInt(time[1]) !== 0) {
        setTimer(parseInt(time[0]), parseInt(time[1]) - 1,59);
    } else if (parseInt(time[0]) !== 0) {
        setTimer(parseInt(time[0]) - 1, 59, 59)
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

//play buttons
const arcadeStart_zombieDefense = document.getElementById("arcadeStart-zombieDefense");
arcadeStart_zombieDefense.addEventListener('click', () => {
    document.getElementById("arcade-selectGame").style.display = "none";
    document.getElementById("zombieDefense").style.display = "block";
    console.log("szd does this work????????");
});

const arcadeStart_policeGame = document.getElementById("arcadeStart-policeGame");
arcadeStart_policeGame.addEventListener('click', () => {
    document.getElementById("arcade-selectGame").style.display = "none";
    document.getElementById("policeGame").style.display = "block";
    console.log("spg does this work????????");
});

//close buttons
const arcadeBack_policeGame = document.getElementById("arcade-backFrom-PoliceGame");
arcadeBack_policeGame.addEventListener('click', () => {
    document.getElementById("arcade-selectGame").style.display = "inline";
    document.getElementById("policeGame").style.display = "none";
    console.log("cpg does this work????????");
});

const arcadeBack_zombieDefense = document.getElementById("arcade-backFrom-ZombieDefense");
arcadeBack_zombieDefense.addEventListener('click', () => {
    document.getElementById("arcade-selectGame").style.display = "inline";
    document.getElementById("zombieDefense").style.display = "none";
    console.log("czd does this work????????");
});
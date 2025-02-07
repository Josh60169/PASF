let timer = document.getElementById("timer-time");
let timerMethod="standard";

const customBtnClick = () => {
    document.getElementById("customInputBox").style.visibility = "visible";
};

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    timerMethod = document.querySelector('input[name="radAns"]:checked').id;
});

let stopTimer = false;
const startTimer = () => {
    if (timerMethod === "standard") {
        countDownTimer()
        if (stopTimer == true)
            console.log('stop');
    }
}

const countDownTimer = () => {
    let time = document.getElementById("timer-time").innerText.split(":");
    console.log(time);

    if (parseInt(time[2]) !== 0) {
        setTimer(parseInt(time[0]), parseInt(time[1]), parseInt(time[2] - 1));
    } else if (parseInt(time[1]) !== 0) {
        setTimer(parseInt(time[0]), parseInt(time[1] - 1),59);
    } else if (parseInt(time[0]) !== 0) {
        setTimer(parseInt(time[0] - 1), 59, 59)
    } else {
        stopTimer = true;
    }
}

const setTimer = (hrs, mins, secs) => {
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

    timer.innerText = `${hrs}:${newMins}:${newSecs}`;
}
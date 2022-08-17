const ring = document.querySelector('.ring');
const stopStartButton = document.querySelector('button.start');
const settingsButton = document.querySelector('.settings img');

const secondsElement = document.querySelector('.seconds > input');
const minutesElement = document.querySelector('.minutes > input');
const colon = document.querySelector('.colon');

let currentMinutes = minutesElement.value;
let currentSeconds = secondsElement.value;
let inEditMode = false;
let intervalId = null;

//  ? To editing the minutes and seetting the minutes interval
function editMinutes(temp) {
    const minutes = temp.target.value;
    if (parseInt(minutes) && parseInt(minutes) >= 0 && parseInt(minutes) <= 99) {
        currentMinutes = minutes.padStart(2, "0");
        minutesElement.value = currentMinutes.padStart(2, "0");
        return;
    }
    minutesElement.value = currentMinutes;
}

//  Editing the seconds and seetting the seconds interval
function editSeconds(temp) {
    const seconds = temp.target.value;
    if (parseInt(seconds) && parseInt(seconds) >= 1 && parseInt(seconds) <= 99) {
        currentSeconds = seconds.padStart(2, "0");
        secondsElement.value = currentSeconds.padStart(2, "0");
        return;
    }
    secondsElement.value = currentSeconds;
}


// Editing the settings Buttona and setting the minute and  second s Element 
function editSettings() {
    if (inEditMode) {
        inEditMode = !inEditMode;
        stopStartButton.style.visibility = 'visible';
        minutesElement.disabled = true;
        secondsElement.disabled = true;
        settingsButton.src = "images/gear.svg";
        return;
    }
    inEditMode = !inEditMode;
    stopStartButton.style.visibility = 'hidden';
    minutesElement.disabled = false;
    secondsElement.disabled = false;
    settingsButton.src = "images/check.svg";
}

//  Ressetting the start and stop button 
function changeButton() {
    if (stopStartButton.innerHTML == "start") {
        stopStartButton.innerHTML = "stop";
        settingsButton.style.visibility = 'hidden';
        intervalId = setInterval(updateClock, 1000);
    } else {
        stopStartButton.innerHTML = "start";
        settingsButton.style.visibility = 'visible';
        colon.style.visibility = "";
        if (intervalId)
            clearInterval(intervalId);
    }
}


//  Logic for updating the clock in a realtime using the timeinterval function 
function updateClock() {
    console.log('Updating the clock in a realtime using the timeinterval function');
    if (parseInt(secondsElement.value) === 0 && parseInt(minutesElement.value) === 0) {
        timerEnd();
    } else if (parseInt(secondsElement.value) === 0) {
        secondsElement.value = 59;
        minutesElement.value = String(minutesElement.value - 1).padStart(2, "0");
    } else {
        secondsElement.value = String(parseInt(secondsElement.value) - 1).padStart(2, "0");
    }
    if (colon.style.visibility === "hidden") {
        colon.style.visibility = "";
    } else {
        colon.style.visibility = "hidden";
    }
}

//  Ending the clock in a realtime using the clearInterval function
function timerEnd() {
    stopStartButton.innerHTML = "start";
    ring.classList.add("ending");
    clearInterval(intervalId);
    alert("Timer Finished");
}

//  Adding eventListener which listens and trigger  the event
stopStartButton.addEventListener("click", changeButton)
settingsButton.addEventListener("click", editSettings)
minutesElement.addEventListener("change", editMinutes)
secondsElement.addEventListener("change", editSeconds)
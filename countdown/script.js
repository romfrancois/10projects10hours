const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateElements(time) {
    daysElement.innerHTML = formatTime(time.days);
    hoursElement.innerHTML = formatTime(time.hours);
    minutesElement.innerHTML = formatTime(time.minutes);
    secondsElement.innerHTML = formatTime(time.secondsleft);
}

function countdown(toDate) {
    const targetDate = new Date(toDate);
    const currentDate = new Date();

    const nbSeconds = (targetDate - currentDate) / 1000;

    const days = Math.floor(nbSeconds / 3600 / 24);
    const hours = Math.floor(nbSeconds / 3600) % 24 ;
    const minutes = Math.floor(nbSeconds / 60) % 60;
    const secondsleft = Math.floor(nbSeconds % 60);

    // console.log(days, hours, minutes, secondsleft);
    updateElements({days, hours, minutes, secondsleft});
}


const newYearsEve = "1 Jan 2021";
// countdown(newYearsEve);
setInterval (() => countdown(newYearsEve), 1000);
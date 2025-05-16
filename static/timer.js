const timer_lol = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
let reset_click = 0;
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

function  load_time() {
    seconds = parseInt(localStorage.getItem("seconds")) || 0;
    minutes = parseInt(localStorage.getItem("minutes")) || 0;
    hours = parseInt(localStorage.getItem("hours")) || 0;

    const formattedTime =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer_lol.textContent = formattedTime;
}

load_time();

function save_time() {
    localStorage.setItem("seconds", seconds.toString());
    localStorage.setItem("minutes", minutes.toString());
    localStorage.setItem("hours", hours.toString());
}

function updateTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    save_time();

    const formattedTime =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timer_lol.textContent = formattedTime;
}

start.addEventListener('click', () => {
    if (timer) {
        start.textContent = 'оно уже запущено, оставь кнопку в покое';
        window.setTimeout(() => {
            start.textContent = 'Старт';
        }, 1000)
        return;
    }
    timer = window.setInterval(updateTime, 1000);
});

stop.addEventListener('click', () => {
    if (!timer) {
        stop.textContent = 'оно уже на паузе, оставь кнопку в покое';
        window.setTimeout(() => {
            stop.textContent = 'Стоп';
        }, 1000)
        return;
    }
    window.clearInterval(timer);
    timer = null;
    start.textContent = 'Старт';
});

reset.addEventListener('click', () => {
    if (reset_click === 0) {
        reset_click++;
        alert('Вы уверены, что хотите сбросить таймер?');
        return;
    } else if (reset_click === 1) {
        reset_click++;
        alert("ВНИМАНИЕ! ЭТО ПРЕДПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ!")
        return
    } else if (reset_click === 2) {
        reset_click++;
        alert("ЭТО ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ! ВАШЕ ВРЕМЯ БУДЕТ СБРОШЕНО!")
        return
    }
    window.clearInterval(timer);
    timer = null;
    seconds = 0;
    minutes = 0;
    hours = 0;
    save_time();
    timer_lol.textContent = "00:00:00";
    alert("Вы сами попросили то что мы сделали")
    reset_click = 0;
});
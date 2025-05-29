const timer_lol = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const dvd = document.getElementById('dvd');
let dvd_lol = null;
let dvd_interval = null;
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

dvd.addEventListener('click', () => {
    if (dvd_lol) {
        dvd_lol.remove();
        dvd_lol = null;
        clearInterval(dvd_interval); // Исправлено: правильный метод очистки интервала
        dvd_interval = null;
        dvd.textContent = "Добавить DVD";
    } else {
        dvd_lol = document.createElement('img');
        dvd_lol.src = 'static/dvd.png';
        dvd_lol.style.width = '10%';
        dvd_lol.style.position = 'absolute';
        dvd_lol.style.padding = '10px'; // Добавлено: создаем тело для backgroundColor

        let x = 500;
        let y = 500;
        let dx = 4;
        let dy = 4;

        // Ждем загрузки изображения перед началом анимации
        dvd_lol.onload = function() {
            dvd_lol.style.top = y + 'px';
            dvd_lol.style.left = x + 'px';

            function moveDvd() {
                x += dx;
                y += dy;

                const dvdWidth = dvd_lol.offsetWidth;
                const dvdHeight = dvd_lol.offsetHeight;
                const titlebarHeight = 32;

                if (x <= 0 || x + dvdWidth >= window.innerWidth) {
                    dx = -dx;
                    dvd_lol.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                }

                if (y <= titlebarHeight || y + dvdHeight >= window.innerHeight) {
                    dy = -dy;
                    dvd_lol.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                }

                dvd_lol.style.left = x + 'px';
                dvd_lol.style.top = y + 'px';
            }

            dvd_interval = setInterval(moveDvd, 10);
        };

        document.body.appendChild(dvd_lol);
        dvd.textContent = "Убрать DVD";
    }
});

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
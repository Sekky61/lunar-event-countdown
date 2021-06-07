
const time_container = document.querySelector("#next-date-cont")
const others_container = document.querySelector("#times-cont")
const local_switch = document.querySelector("#local-switch")

const base_time = new Date(Date.UTC(2021, 5, 6, 6, 30, 33));
const timezone_offset_minutes = - base_time.getTimezoneOffset(); // negated, so for example offset for UTC+2 is 120 (and not -120)
const now = new Date();
const future_events_count = 6;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Lunar Cycle - 29h 12m 44s
const LC_HOURS = 29;
const LC_MINS = 12;
const LC_SECS = 44;

function add_lunar_cycle(date_obj) {
    date_obj.setHours(date_obj.getHours() + LC_HOURS);
    date_obj.setMinutes(date_obj.getMinutes() + LC_MINS);
    date_obj.setSeconds(date_obj.getSeconds() + LC_SECS);
}

var local_time = false;

function format_date(date_obj) {

    let date_copy = new Date(date_obj);

    if (local_time) {
        date_copy.setUTCMinutes(date_copy.getUTCMinutes() + timezone_offset_minutes);
    }

    let date = date_copy.getUTCDate();
    let month = months[date_copy.getUTCMonth()];
    let day = days[date_copy.getUTCDay()];

    let hour_string = ('0' + date_copy.getUTCHours()).slice(-2);
    let min_string = ('0' + date_copy.getUTCMinutes()).slice(-2);

    return [`${hour_string}:${min_string}`, `${day} ${month} ${date}`]
}

function create_event_element(date_obj) {
    let el = document.createElement("div");
    el.className = "event-div";

    const [time_string, date_string] = format_date(date_obj);

    let time_el = document.createElement("span");
    time_el.textContent = time_string;
    el.appendChild(time_el);

    let date_el = document.createElement("span");
    date_el.textContent = date_string;
    el.appendChild(date_el);

    return el;
}

function draw_data() {
    if (future_events_count > 0) {
        const [time_string, date_string] = format_date(moons_since_ever[next_event_index]);
        time_container.textContent = `${time_string} ${date_string}`;

        others_container.textContent = "";

        for (var i = next_event_index + 1; i < moons_since_ever.length; i++) {
            var el = create_event_element(moons_since_ever[i]);
            others_container.appendChild(el);
        }
    }
}

local_switch.addEventListener('click', (e) => {
    local_time = !local_time;
    draw_data();
}
);


var iter_time = new Date(base_time);

console.log("start iter: " + iter_time.toString())

const moons_since_ever = [];

while (iter_time < now) {
    moons_since_ever.push(new Date(iter_time));
    add_lunar_cycle(iter_time);
}

const next_event_index = moons_since_ever.length;

for (var i = 0; i < future_events_count; i++) {
    moons_since_ever.push(new Date(iter_time));
    add_lunar_cycle(iter_time);
}

draw_data();

console.table(moons_since_ever);


const time_container = document.querySelector("#next-cont")
const others_container = document.querySelector("#times-cont")

const base_time = new Date(2021, 5, 6, 8, 30, 30);
const now = new Date();
const future_events_count = 6;
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Lunar Cycle - 29h 12m 44s
const LC_HOURS = 29;
const LC_MINS = 12;
const LC_SECS = 44;

function add_lunar_cycle(date_obj) {
    date_obj.setHours(date_obj.getHours() + LC_HOURS);
    date_obj.setMinutes(date_obj.getMinutes() + LC_MINS);
    date_obj.setSeconds(date_obj.getHours() + LC_SECS);
}

function format_date(date_obj) {
    let hour = date_obj.getHours();
    let min = date_obj.getMinutes();
    let date = date_obj.getDate();
    let month = months[date_obj.getMonth()];
    let day = days[date_obj.getDay()];
    return `${hour}:${min} - ${day} ${month} ${date}`
}

function create_event_element(date_obj) {
    let el = document.createElement("div");
    el.className = "event-div";
    el.textContent = format_date(date_obj);
    return el;
}

var iter_time = new Date(base_time);

console.log("start iter: " + iter_time.toString())

const moons_since_ever = [];

while (iter_time < now){
    moons_since_ever.push(new Date(iter_time));
    add_lunar_cycle(iter_time);
}

const next_event_index = moons_since_ever.length;

for (var i = 0; i < future_events_count; i++) {
    moons_since_ever.push(new Date(iter_time));
    add_lunar_cycle(iter_time);
}

if(future_events_count > 0) {
    time_container.innerHTML = format_date(moons_since_ever[next_event_index]);

    for (var i = next_event_index + 1; i < moons_since_ever.length; i++) {
        var el = create_event_element(moons_since_ever[i]);
        others_container.appendChild(el);
    }
}

console.table(moons_since_ever);
console.log(next_event_index);
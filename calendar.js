/*  Javascript calendar generator
    by Mikko-Pentti Einari Eronen
    2025
*/



// Finnish, Swedish, English
const months = {
    1: ["tammikuu", "januari", "january"],
    2: ["helmikuu", "februari", "february"],
    3: ["maaliskuu", "mars", "march"],
    4: ["huhtikuu", "april", "april"],
    5: ["toukokuu", "maj", "may"],
    6: ["kesäkuu", "juni", "june"],
    7: ["heinäkuu", "juli", "july"],
    8: ["elokuu", "augusti", "august"],
    9: ["syyskuu", "september", "september"],
    10: ["lokakuu", "oktober", "october"],
    11: ["marraskuu", "november", "november"],
    12: ["joulukuu", "december", "december"]
};


const days = {
    0: ["Sunnuntai", "söndag", "sunday"],
    1: ["Maanantai", "måndag", "monday"],
    2: ["Tiistai", "tisdag", "tuesday"],
    3: ["Keskiviikko", "onsdag", "wednesday"],
    4: ["Torstai", "torsdag", "thursday"],
    5: ["Perjantai", "fredag", "friday"],
    6: ["Lauantai", "lördag", "saturday"]
}


class Month {
    constructor(name) {
        this.name = months[name];
        this.days_in_month = 0;
        this.days = {};
    }

    set_days_in_month(days) {
        this.days_in_month = days;
    }
}

class Day {
    constructor(number) {
        this.name = days[number];
    }
}


// Generate yearly calendar data based on a given year and language
function generate_calendar_data() {
    let year = parseInt(document.querySelector("#input-year").value);
    let output = document.querySelector("#output");

    var d = new Date();
    d.setDate(1);
    d.setMonth(0);
    d.setFullYear(year);

    var calendar_data = {};
    calendar_data[year] = {};

    // Generate months.
    for (var i = 1; i <= 12; i++) {
        calendar_data[year][i] = new Month(i, months[i]);
    }

    // Generate days.
    const next_year = d.getFullYear() + 1;
    while (d.getFullYear() < next_year) {

        // Korjaa oikea viikonpäivä.
        let month_key = d.getMonth() + 1;
        let day_key = d.getDate();
        let weekday = d.getDay();
        let new_day = new Day(weekday);
        calendar_data[year][month_key].days[day_key] = new_day;

        d.setDate(d.getDate() + 1);
    }

    // Update days in month counts.
    for (var i = 1; i <= 12; i++) {
        var dim = Object.keys(calendar_data[year][i].days).length;
        calendar_data[year][i]["days_in_month"] = dim;
    }


    
    output.innerHTML = JSON.stringify(calendar_data, null, 2);
}

function set_default_year() {
    document.querySelector("#input-year").value = new Date().getFullYear() + 1;
}

window.onload = function() {
    set_default_year();
    document.querySelector("#btn-generate").onclick = generate_calendar_data;
}
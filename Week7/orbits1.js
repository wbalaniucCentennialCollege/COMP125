/* JavaScript 6th Edition
   Chapter 7
   Chapter case
   
   Outer Orbits
   Author:
   Date:
   
   Filename: orbits.js
*/

"use strict"; // interpret contents in JavaScript strict mode
var dateObject = new Date(); // Global date object

function displayCalendar(whichMonth) {
    // Variable declarations
    var date;
    var dateToday = new Date();	// Date objects (notice the "new" keyword) of TODAYS date
    var dayOfWeek;
    var daysInMonth;
    var dateCells;
    var captionValue;
    var month;
    var year;
    var monthArray = ["January", "February", "March", "April", "May",
       "June", "July", "August", "September", "October", "November",
       "December"]; 	// Array of valid months


    // This will allow users to navigate to the previous and next months using the buttons in the widget
    if (whichMonth === -1) {
        dateObject.setMonth(dateObject.getMonth() - 1);
    } else if (whichMonth === 1) {
        dateObject.setMonth(dateObject.getMonth() + 1);
    }

    // Setting values
    month = dateObject.getMonth();
    year = dateObject.getFullYear();
    dateObject.setDate(1);
    dayOfWeek = dateObject.getDay();
    captionValue = monthArray[month] + " " + year;

    // Building the calendar and populating cells according to proper day, month and year
    document.querySelector("#cal table caption").innerHTML = captionValue;
    if (month === 0 || month === 2 || month === 4 ||
       month === 6 || month === 7 || month === 9 ||
       month === 11) { // Jan, Mar, May, Jul, Aug, Oct, Dec
        daysInMonth = 31;
    } else if (month === 1) { // Feb
        if (year % 4 === 0) { // leap year test
            if (year % 100 === 0) {
                // year ending in 00 not a leap year unless
                // divisible by 400
                if (year % 400 === 0) {
                    daysInMonth = 29;
                } else {
                    daysInMonth = 28;
                }
            } else {
                daysInMonth = 29;
            }
        } else {
            daysInMonth = 28;
        }
    } else { // Apr, Jun, Sep, Nov
        daysInMonth = 30;
    }
    dateCells = document.getElementsByTagName("td");

    for (var i = 0; i < dateCells.length; i++) {
        // clear existing table dates
        dateCells[i].innerHTML = "";
        dateCells[i].className = "";
    }

    for (var i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
        // add dates to days cells
        dateCells[i].innerHTML = dateObject.getDate();
        dateCells[i].className = "date";

        // If date in the future, set class name to "futuredate" so CSS can apply proper styling.
        if (dateToday < dateObject) {
            dateCells[i].className = "futuredate";
        }
        date = dateObject.getDate() + 1;
        dateObject.setDate(date);
    }
    dateObject.setMonth(dateObject.getMonth() - 1);
    // reset month to month shown
    document.getElementById("cal").style.display = "block";
    // display calendar if it's not already visible
}

function selectDate(event) {
    if (event === undefined) { // get caller element in IE8
        event = window.event;
    }

    // Reference cell that was clicked
    var callerElement = event.target || event.srcElement;
    if (callerElement.innerHTML === "") {
        // cell contains no date, so don’t close the calendar
        document.getElementById("cal").style.display = "block"; // Display calendar
        return false;
    }
    dateObject.setDate(callerElement.innerHTML);

    // Create new Date object to be used to create full date string
    var fullDateToday = new Date();

    var dateToday = Date.UTC(fullDateToday.getFullYear(),
       fullDateToday.getMonth(), fullDateToday.getDate());

    var selectedDate = Date.UTC(dateObject.getFullYear(),
           dateObject.getMonth(), dateObject.getDate());

    // Check if selected date is in the past
    if (selectedDate <= dateToday) {
        document.getElementById("cal").style.display = "block"; // Display calendar
        return false;
    }

    // We have selected a good value (in the future)
    document.getElementById("tripDate").value = dateObject.toLocaleDateString();
    hideCalendar();
}

function hideCalendar() {
    document.getElementById("cal").style.display = "none";
}

function prevMo() {
    displayCalendar(-1);
}
function nextMo() {
    displayCalendar(1);
}

function createEventListeners() {
    var dateField = document.getElementById("tripDate");

    // Event listener to DISPLAY calendar
    if (dateField.addEventListener) {
        dateField.addEventListener("click", displayCalendar, false);
    } else if (dateField.attachEvent) {
        dateField.attachEvent("onclick", displayCalendar);
    }

    // Event listener to SELECT DATE
    var dateCells = document.getElementsByTagName("td");
    if (dateCells[0].addEventListener) {
        for (var i = 0; i < dateCells.length; i++) {
            dateCells[i].addEventListener("click", selectDate, false);
        }
    } else if (dateCells[0].attachEvent) {
        for (var i = 0; i < dateCells.length; i++) {
            dateCells[i].attachEvent("onclick", selectDate);
        }
    }

    // Event Listeners to HIDE calendar
    var closeButton = document.getElementById("close");
    if (closeButton.addEventListener) {
        closeButton.addEventListener("click", hideCalendar, false);
    } else if (closeButton.attachEvent) {
        closeButton.attachEvent("onclick", hideCalendar);
    }
    var prevLink = document.getElementById("prev");
    var nextLink = document.getElementById("next");
    if (prevLink.addEventListener) {
        prevLink.addEventListener("click", prevMo, false);
        nextLink.addEventListener("click", nextMo, false);
    } else if (prevLink.attachEvent) {
        prevLink.attachEvent("onclick", prevMo);
        nextLink.attachEvent("onclick", nextMo);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
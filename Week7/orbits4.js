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
var countdown;
/*                    3                 */
/*
var ticket = {
    date: "",
    passengers: {
        fName: "",
        lName: ""
    }
};
*/
/*
var ticket = {
    passengers: {
        fName: "",
        lName: ""
    }
};
*/
var ticket = {
    passengersOnTicket: 0,
    passengers: {},  // Empty sub-object
    calcCost: updateTotalCost // Adding method
}


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
    countdown = setInterval(updateCountdown, 1000);
    document.getElementById("countdownSection").style.display = "block"; // Displays countdown information
    document.getElementById("ticket").style.display = "block";  // Displays "ticket"
    ticket.date = dateObject.toLocaleDateString();  // Sets ticket information
    document.getElementById("selectedDate").innerHTML = ticket.date; // Sets ticket date
    document.getElementById("dateSection").style.display = "block"; // Displays date selected date information
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

/*                   2                   */
function updateTotalCost() {
    // var totalCost = 250000;
    var totalCost = this.passengersOnTicket * 250000;
    var monthlyCost = totalCost / 60;
    var shortMonthlyCost = monthlyCost.toFixed(0);

    document.getElementById("singleLabel").innerHTML =
       "Single payment of $" + totalCost.toLocaleString(); // Sets label to include the value of "totalCost"
    document.getElementById("multipleLabel").innerHTML =
       "60 monthly payments of $" + shortMonthlyCost.toLocaleString(); // Sets label to include the value of "shortMonthlyCost"
}

// Calculates days, hours, minutes and seconds until launch
function updateCountdown() {
    var dateToday = new Date(); // Today's date

    // NOTE: "UTC" returns the number of milliseconds since Jan 1, 1970, 00:00:00
    var dateFrom = Date.UTC(dateToday.getFullYear(),    // Creates a "starting" variables
       dateToday.getMonth(), dateToday.getDate(),
       dateToday.getHours(), dateToday.getMinutes(),
       dateToday.getSeconds());

    var dateTo = Date.UTC(dateObject.getFullYear(),     // Creates an "ending" variables
       dateObject.getMonth(), dateObject.getDate(),
       19, 0, 0); // all launches at 8:00pm UTC

    if ((dateTo - dateFrom) < 1000) { // time will be less than 0 when setInterval runs next 
        clearInterval(countdown);
        document.getElementById("countdownSection").style.display = "none";
    }

    // Calculates numbers of days, hours, minutes, seconds between start and end
    // days
    var daysUntil = Math.floor((dateTo - dateFrom) / 86400000); // 86400000 is the # of milliseconds in a day. 
    document.getElementById("countdown").innerHTML = daysUntil;

    //  hours
    var fractionalDay = (dateTo - dateFrom) % 86400000; // Returns number of days between both dates
    var hoursUntil = Math.floor(fractionalDay / 3600000); // 3600000 is the number of microseconds in an hour
    if (hoursUntil < 10) {
        hoursUntil = "0" + hoursUntil;
    }
    document.getElementById("countdown").innerHTML += ":" + hoursUntil;

    // minutes
    var fractionalHour = fractionalDay % 3600000;
    var minutesUntil = Math.floor(fractionalHour / 60000); // 60000 number of microseconds in a minute
    if (minutesUntil < 10) {
        minutesUntil = "0" + minutesUntil;
    }
    document.getElementById("countdown").innerHTML +=
       ":" + minutesUntil;

    // seconds
    var fractionalMinute = fractionalHour % 60000;
    var secondsUntil = Math.floor(fractionalMinute / 1000); // 1000 number of microseconds in a second
    if (secondsUntil < 10) {
        secondsUntil = "0" + secondsUntil;
    }
    document.getElementById("countdown").innerHTML +=
       ":" + secondsUntil;
}

/*              3              */
function registerName() {
    var passengerList = document.getElementById("passengers");
    var passengerName = document.createElement("li");
    /*           4              */

    
    var newFnameProp;
    var newLnameProp;
    ticket.passengersOnTicket += 1;
    newFnameProp = "fname" + ticket.passengersOnTicket; // Creates a property "fname"+currentPassenger. (AKA: First passenger property will be fName1)
    newLnameProp = "lname" + ticket.passengersOnTicket;

    // Referring to arrays in an "Associative way"
    ticket.passengers[newFnameProp] = document.getElementById("fname").value;
    ticket.passengers[newLnameProp] = document.getElementById("lname").value;

    passengerName.innerHTML = ticket.passengers[newFnameProp] + " " + ticket.passengers[newLnameProp];
    passengerList.appendChild(passengerName);   // Appents passengerName to the passengerList element
   

    /*
    ticket.passengers.fName = document.getElementById("fname").value;  // Assigns fname field to the fName property of ticket
    ticket.passengers.lName = document.getElementById("lname").value;  // Assigns lname field to the lName property of ticket

    passengerName.innerHTML = ticket.passengers.fName + " " + ticket.passengers.lName;    // Assigns fName + lName to the passengerName element with a space inbetween
    passengerList.appendChild(passengerName);   // Appents passengerName to the passengerList element
    */


    // Reset fname and lname elements on the form
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";

    // Display ticket info
    document.getElementById("ticket").style.display = "block";
    document.getElementById("passengersSection").style.display = "block";

    // Return focus to first name field
    document.getElementById("fname").focus();
    
    ticket.calcCost();
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

    /*            3             */
    // Register button for click event
    var nameButton = document.getElementById("addName");
    if (nameButton.addEventListener) {
        nameButton.addEventListener("click", registerName, false);
    } else if (nameButton.attachEvent) {
        nameButton.attachEvent("onclick", registerName);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
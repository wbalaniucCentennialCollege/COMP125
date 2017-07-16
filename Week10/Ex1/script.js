/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

// GLOBAL VARIABLES
var zIndexCounter;
var pos = [];
var origin;

// perform setup tasks when page first loads
function setUpPage() {
   document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
   document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);

    // Adds an event listener to each "furniture" object, triggered by the mousedown event.
   var movableItems = document.querySelectorAll("#room div");
   zIndexCounter = movableItems.length + 1;
   for (var i = 0; i < movableItems.length; i++) {
       if (movableItems[i].addEventListener) {
           movableItems[i].addEventListener("mousedown", startDrag, false);
       } else if (movableItems[i].attachEvent) {
           movableItems[i].attachEvent("onmousedown", startDrag);
       }
   }
}

// configure page to display Setup content
function loadSetup() {
   document.querySelector("nav ul li:first-of-type").className = "current";
   document.querySelector("nav ul li:last-of-type").className = "";
   document.getElementById("setup").style.display = "block";
   document.getElementById("location").style.display = "none";
   location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
   document.querySelector("nav ul li:first-of-type").className = "";
   document.querySelector("nav ul li:last-of-type").className = "current";
   document.getElementById("setup").style.display = "none";
   document.getElementById("location").style.display = "block";
}

// add event listeners and move object
// when user starts draggin
/*
    z-index sets stacking order of overlapping elements. The object being dragged will always be on top
    pos variable comes in the form of pos = [x,y]
*/
function startDrag(evt) {
    // set z-index to move selected element on top of others
    this.style.zIndex = zIndexCounter;
    // increment z-index counter so next selected element is on top of the others
    zIndexCounter++;

    this.addEventListener("mousemove", moveDrag, false);
    this.addEventListener("mouseup", removeDragListener, false);

    pos = [this.offsetLeft, this.offsetTop];
    origin = getCoords(evt); // Get coordinates of mouse click and stores it in origin
}

// calculate new location of dragged object
function moveDrag(evt) {
    var currentPos = getCoords(evt); // Uses the getCoords function to get mouse coordinates
    var deltaX = currentPos[0] - origin[0]; // Difference of x position between currentPos and origin
    var deltaY = currentPos[1] - origin[1]; // Difference of y position between currentPos and origin
    this.style.left = (pos[0] + deltaX) + "px"; // Assigns posX + deltaX + "px" to left property 
    this.style.top = (pos[1] + deltaY) + "px"; // Assigns posY + deltaY + "px" to top property
}

// Combines mouseX and mouseY coordinates into one object
function getCoords(evt) {
    var coords = [];
    coords[0] = evt.clientX;
    coords[1] = evt.clientY;
    return coords;
}

// Ensures subsequent mouse moves don't change the position of the current element
function removeDragListener() {
    this.removeEventListener("mousemove", moveDrag, false);
    this.removeEventListener("mouseup", removeDragListener, false);
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);
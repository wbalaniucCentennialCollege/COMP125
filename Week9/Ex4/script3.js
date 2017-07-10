/*    JavaScript 6th Edition
 *    Chapter 9
 *    Chapter case

 *    Eating Well in Season 
 *    Author: 
 *    Date:   

 *    Filename: script3.js
 */

"use strict";


function parseData() {
   var formData = decodeURIComponent(location.search); // Replaced any encoded characters in the query string with character equivalents and then assigns it to formData.
   var formArray = [];
   var list = document.querySelector("div.results ul"); // Unordered list within the div in the results class
   formData = formData.substring(1, formData.length); 
   while (formData.indexOf("+") !== -1) { // Replaces each occurance of + with a space
      formData = formData.replace("+", " ");
   }
   formData = decodeURIComponent(formData); // Converts any remaining encoded characters in formData to character equivalents
   formArray = formData.split("&"); //
   for (var i = 0; i < formArray.length; i++) { // Each iteration: new li is created. 
      var newItem = document.createElement("li");
      newItem.innerHTML = formArray[i];
      list.appendChild(newItem);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", parseData, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", parseData);
}
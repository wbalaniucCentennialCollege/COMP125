/*    JavaScript 6th Edition
 *    Chapter 9
 *    Chapter case

 *    Eating Well in Season 
 *    Author: 
 *    Date:   

 *    Filename: script.js
 */

"use strict";

function clearCookies() {
   var cookieString = document.cookie; // Cookie data
   var cookieArray = cookieString.split("; "); // Array of each cooke data separated into their elements
   var expiresDate = new Date(); // Current date
   expiresDate.setDate(expiresDate.getDate() - 7); // Sets expire date to 7 days in the past
   for (var i = 0; i < cookieArray.length; i++) { // Recreates each cookie in the array, appending an expires attribute that uses expiresDate
      document.cookie = cookieArray[i] + "; expires=" + expiresDate.toUTCString();
   }
}

if (window.addEventListener) {
   window.addEventListener("load", clearCookies, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", clearCookies);
}
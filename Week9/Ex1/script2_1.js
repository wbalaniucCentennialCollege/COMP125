/*    JavaScript 6th Edition
 *    Chapter 9
 *    Chapter case

 *    Eating Well in Season 
 *    Author: 
 *    Date:   

 *    Filename: script2.js
 */

"use strict";

// global variable
var queryArray = [];

function populateInfo() {
   if (location.search) {
      var queryData = location.search;
      queryData = queryData.substring(1, queryData.length);
      queryArray = queryData.split("&");
   }
}

if (window.addEventListener) {
    window.addEventListener("load", populateInfo, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", populateInfo);
}
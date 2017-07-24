<?php
$WeatherSource = "https://api.darksky.net/forecast/fb13eac1f7b996df08bad0f0f154bab4/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>
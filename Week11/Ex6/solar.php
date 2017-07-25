<?php
$WeatherSource = "https://api.darksky.net/forecast/d99d4c607efe79064439d6eff038ebd6/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>
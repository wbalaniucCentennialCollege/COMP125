<?php
$WeatherSource = "https://api.forecast.io/forecast/a8b6abe791df51b4f3db619d706fb564/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>
<?php
$_POST = json_decode(file_get_contents("php://input"), true); // это для работы с данными на сервере. AJAX async. 
// После того как включил этот параметр 
// в консоль стал приходить ответ
echo var_dump($_POST);
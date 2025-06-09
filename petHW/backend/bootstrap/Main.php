<?php
 
require_once __DIR__ . '/../vendor/Autoload.php';
use vendor\DB;
use vendor\Router; 
//class router no find router類別找不到 先看有沒有use 是否在vendor裡面
class Main{
    static function run(){
        $conf =  parse_ini_file(__DIR__ . '/../vendor/.env');
        DB::$dbHost = $conf['dbHost'];
        DB::$dbName = $conf['dbName'];
        DB::$dbUser = $conf['dbUser'];
        DB::$dbPassword = $conf['dbPassword'];
        if(isset($_GET['action']))
        $action = $_GET['action'];
    else
        $action = "no_action";


    $router = new Router();
    require_once __DIR__ . '/../routes/web.php';
    $response = $router->run($action);

    echo json_encode($response);

    }
}

?>
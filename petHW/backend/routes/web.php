<?php
// 保留現有的使用者路由
$router->register(action: 'getUsers', class: 'user', method: 'getUsers');
$router->register(action: 'newUser', class: 'user', method: 'newUser');
$router->register(action: 'removeUser', class: 'user', method: 'removeUser');
$router->register(action: 'updateUser', class: 'user', method: 'updateUser');

// 更新寵物路由 - 修改 class 為 'pet' 並調整方法名稱
$router->register(action: 'getpet_information', class: 'pet', method: 'getPets');
$router->register(action: 'newpet_information', class: 'pet', method: 'newPet');
$router->register(action: 'removepet_information', class: 'pet', method: 'removePet');
$router->register(action: 'updatepet_information', class: 'pet', method: 'updatePet');
?>
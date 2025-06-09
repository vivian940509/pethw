<?php
namespace app\Models;
use vendor\DB;

class user
{
    public function getUsers(){
        $sql = "SELECT * FROM user";
        $arg = NULL;
        return DB::select($sql,  NULL);  
    }
    
    public function getUser($id){
        $sql = "SELECT * FROM user WHERE id = ?";
        $arg = array($id);
        return DB::select($sql, $arg);
    }
    
    public function newUser($id, $name, $email, $phone, $id_card){
        $sql = "INSERT INTO user (`id`, `name`, `email`, `phone`, `id_card`) VALUES (?, ?, ?, ?, ?)";
        return DB::insert($sql, array($id, $name, $email, $phone, $id_card));
    }
    
    public function removeUser($id){
        $sql = "DELETE FROM user WHERE id = ?";
        return DB::delete($sql, array($id));        
    }
    
    public function updateUser($id, $name, $email, $phone, $id_card){
        $sql = "UPDATE user SET name = ?, email = ?, phone = ?, id_card = ? WHERE id = ?";
        return DB::update($sql, array($name, $email, $phone, $id_card, $id));
    }
}
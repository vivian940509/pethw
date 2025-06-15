<?php
namespace app\Models;
use vendor\DB;

class pet
{
    public function getPets(){
        // 修改表名從 pet 到 pet_information
        $sql = "SELECT * FROM pet_information";
        return DB::select($sql, NULL);  
    }
    
    public function getPet($id){
        // 修改表名從 pet 到 pet_information
        $sql = "SELECT * FROM pet_information WHERE id = ?";
        $arg = array($id);
        return DB::select($sql, $arg);
    }
    
    public function newPet($id, $name, $species, $age, $description, $photo, $status, $created_by){
        // 修改表名從 pet 到 pet_information
        $sql = "INSERT INTO pet_information (`id`, `name`, `species`, `age`, `description`, `photo`, `status`, `created_by`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return DB::insert($sql, array($id, $name, $species, $age, $description, $photo, $status, $created_by));
    }
    
    public function removePet($id){
        // 修改表名從 pet 到 pet_information
        $sql = "DELETE FROM pet_information WHERE id = ?";   
        return DB::delete($sql, array($id));        
    }
    
    public function updatePet($id, $name, $species, $age, $description, $photo, $status, $created_by){
        // 修改表名從 pet 到 pet_information
        $sql = "UPDATE pet_information SET name = ?, species = ?, age = ?, description = ?, photo = ?, status = ?, created_by = ? WHERE id = ?";
        return DB::update($sql, array($name, $species, $age, $description, $photo, $status, $created_by, $id));
    }
}
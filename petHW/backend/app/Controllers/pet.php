<?php

namespace app\Controller; 
use vendor\Controller;
use app\Models\pet as petModel;

class pet extends Controller
{
    private $petModel;
    
    public function __construct() {
        $this->petModel = new petModel();
    }
    
    public function getPets() {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            return $this->petModel->getPet($id);
        }
        return $this->petModel->getPets();
    }
    
    public function newPet(){
        $id = $_POST['id'] ?? '';
        $name = $_POST['name'] ?? '';
        $species = $_POST['species'] ?? '';
        $age = $_POST['age'] ?? '';
        $description = $_POST['description'] ?? '';
        $photo = $_POST['photo'] ?? '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = __DIR__ . '/../../public/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            $filename = uniqid() . '_' . basename($_FILES['photo']['name']);
            move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $filename);
            $photo = 'uploads/' . $filename;
        }
        $status = $_POST['status'] ?? 'available';  // 預設為可收養
        $created_by = $_POST['created_by'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->petModel->newPet($id, $name, $species, $age, $description, $photo, $status, $created_by);
    }

    public function removePet() {
        $id = $_POST['id'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->petModel->removePet($id);
    }
    
    public function updatePet() {
        $id = $_POST['id'] ?? '';
        $name = $_POST['name'] ?? '';
        $species = $_POST['species'] ?? '';
        $age = $_POST['age'] ?? '';
        $description = $_POST['description'] ?? '';
        $photo = $_POST['photo'] ?? '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = __DIR__ . '/../../public/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            $filename = uniqid() . '_' . basename($_FILES['photo']['name']);
            move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $filename);
            $photo = 'uploads/' . $filename;
        }
        $status = $_POST['status'] ?? '';
        $created_by = $_POST['created_by'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->petModel->updatePet($id, $name, $species, $age, $description, $photo, $status, $created_by);
    }
}

?>
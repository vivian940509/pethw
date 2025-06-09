<?php


namespace app\Controller; 
use vendor\Controller;
use app\Models\user as userModel;

class user extends Controller
{
    private $userModel;  // 修正變數名稱 (原為 $employeeModel)
    
    public function __construct() {
        $this->userModel = new userModel();
    }
    
    public function getUsers() {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            return $this->userModel->getUser($id);
        }
        return $this->userModel->getUsers();
    }
    
    public function newUser(){
        $id = $_POST['id'] ?? '';
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $id_card = $_POST['id_card'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->userModel->newUser($id, $name, $email, $phone, $id_card);
    }

    public function removeUser() {
        $id = $_POST['id'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->userModel->removeUser($id);
    }
    
    public function updateUser() {
        $id = $_POST['id'] ?? '';
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $id_card = $_POST['id_card'] ?? '';
        
        if (empty($id)) {
            return [
                'status' => 400,
                'message' => '缺少必要參數 ID',
                'result' => null
            ];
        }
        
        return $this->userModel->updateUser($id, $name, $email, $phone, $id_card);
    }
}

?>

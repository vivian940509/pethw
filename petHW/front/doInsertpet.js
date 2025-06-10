import { BASE_URL } from "./config.js";

export default function doInsertpet(){
let data = {
         // 取得所有寵物表單資料
         "id": document.getElementById("id").value,
         "name": document.getElementById("name").value,
         "species": document.getElementById("species").value,
         "age": document.getElementById("age").value,
         "description": document.getElementById("description").value,
         "photo": document.getElementById("photo").value,
         "status": document.getElementById("status").value,
         "created_by": document.getElementById("created_by").value
     };
     // 簡單驗證
 if (!data.species) {
         document.getElementById("content").innerHTML = 
             `<div class="alert-message alert-error">寵物種類不可為空</div>`;
         return;
     }

    axios.post(`${BASE_URL}/index.php?action=newpet_information`, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        
        let alertClass = response['status'] === 200 ? 'alert-success' : 'alert-error';
        document.getElementById("content").innerHTML = 
            `<div class="alert-message ${alertClass}">${response['message']}</div>`;
        
        // 無論成功或失敗，都延遲1.5秒後重新載入列表
        setTimeout(() => {
            const event = new Event('click');
            document.getElementById('pet').dispatchEvent(event);
        }, 1500);
    })
    .catch(err => {
        document.getElementById("content").innerHTML = 
            `<div class="alert-message alert-error">發生錯誤: ${err}</div>`;
        
        setTimeout(() => {
            const event = new Event('click');
            document.getElementById('pet').dispatchEvent(event);
        }, 1500);
    });
}
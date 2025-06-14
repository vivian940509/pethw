import doUpdatepet from './doUpdatepet.js';


import { BASE_URL } from './config.js';

export default function showpetUpdatePage(id){

    let data = {
        "id": id,
    };

   axios.get(`${BASE_URL}/index.php?action=getpet_information`, {params: data})
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                const row = rows[0];
                
                let str = `<div class="form-container">
                <form id="petForm" enctype="multipart/form-data">
                <h2>編輯寵物資料</h2>
                <table class="custom-table">
                    <tr>
                        <td>ID：</td>
                        <td><input type="text" id="id" value="${row['id']}" readonly></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" id="name" value="${row['name']}"></td>
                    </tr>
                    <tr>
                        <td>品種：</td>
                        <td><input type="text" id="species" value="${row['species']}"></td>
                    </tr>
                    <tr>
                        <td>年齡：</td>
                        <td><input type="number" id="age" value="${row['age']}"></td>
                    </tr>
                    <tr>
                        <td>描述：</td>
                        <td><textarea id="description" rows="3">${row['description']}</textarea></td>
                    </tr>
                    <tr>
                        <td>照片：</td>
                        <td>
                            ${row['photo'] ? `<img src="${row['photo']}" width="100"><br>` : ''}
                            <input type="file" id="photo" accept="image/*">
                            <input type="hidden" id="old_photo" value="${row['photo'] || ''}">
                        </td>
                    </tr>
                    <tr>
                        <td>狀態：</td>
                        <td>
                            <select id="status">
                                <option value="available" ${row['status'] === 'available' ? 'selected' : ''}>可收養</option>
                                <option value="pending" ${row['status'] === 'pending' ? 'selected' : ''}>待處理</option>
                                <option value="adopted" ${row['status'] === 'adopted' ? 'selected' : ''}>已收養</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>建立者：</td>
                        <td><input type="text" id="created_by" value="${row['created_by']}"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <button id="doUpdatepet" class="custom-btn">修改</button>
                            <button id="pet" class="custom-btn">返回列表</button>
                        </td>
                    </tr>
                </table>
                </form>
                </div>`;

                document.getElementById("content").innerHTML = str;
                
                document.getElementById("doUpdatepet").onclick = function(){
                     doUpdatepet();
                };
                
                document.getElementById("pet").onclick = function(){
                    petInfo();
                };
                break;
                
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err => {
        document.getElementById("content").innerHTML = err;  
    });          
}
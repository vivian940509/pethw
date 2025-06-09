// 錯誤1: 這裡引入的函數名稱是 showInsertPage，但在 showpetInsertPage.js 中可能導出的是 showpetInsertPage
import showInsertPage from "./showpetInsertPage.js";
import showpetUpdatePage from "./showpetUpdatePage.js";
import doDeletepet from "./doDeletepet.js";

export default function petInfo(){
    // 錯誤2: 可能缺少錯誤處理，如果後端未運行或 API 路徑錯誤會導致未捕獲的異常
    axios.get("http://localhost/petHW/backend/public/index.php?action=getpet_information")

    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                //作畫面
                let str = `<br/><br/><table class="custom-table">`;
                str += `<thead><tr>
                          <th>編號</th>
                          <th>姓名</th>
                          <th>品種</th>
                          <th>年齡</th>
                          <th class="hide-on-tablet">描述</th>
                          <th class="hide-on-tablet">照片</th>
                          <th>狀態</th>
                          <th class="hide-on-tablet">建立者</th>
                          <th style="text-align: center;"><button id='newPet' class="custom-btn">新增寵物</button></th>
                        </tr></thead>
                        <tbody>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    // 錯誤3: 使用 name 屬性在 td 元素上不是標準做法，應使用 data-id 或其他方式
                    str += `<td name='id' data-title="編號">` + element['id'] + `</td>`;
                    str += `<td data-title="姓名">` + (element['name'] || '') + `</td>`;
                    str += `<td data-title="品種">` + (element['species'] || '') + `</td>`;
                    str += `<td data-title="年齡">` + (element['age'] || '') + `</td>`;
                    str += `<td class="hide-on-tablet" data-title="描述">` + (element['description'] || '').substring(0, 30) + (element['description'] && element['description'].length > 30 ? '...' : '') + `</td>`;
                    str += `<td class="hide-on-tablet" data-title="照片">` + (element['photo'] ? `<img src="${element['photo']}" width="50">` : '') + `</td>`;
                    
                    // 根據狀態顯示不同標籤
                    let statusText = '';
                    let statusClass = '';
                    if(element['status'] === 'available') {
                        statusText = '可收養';
                        statusClass = 'status-available';
                    } else if(element['status'] === 'pending') {
                        statusText = '待處理';
                        statusClass = 'status-pending';
                    } else if(element['status'] === 'adopted') {
                        statusText = '已收養';
                        statusClass = 'status-adopted';
                    } else {
                        statusText = element['status'] || '';
                    }
                    
                    str += `<td data-title="狀態"><span class="${statusClass}">${statusText}</span></td>`;
                    str += `<td class="hide-on-tablet" data-title="建立者">` + (element['created_by'] || '') + `</td>`;
                    str += `<td class="action-column" data-title="操作"><button name='updatePet' class="custom-btn">修改</button>&ensp;<button name='deletePet' class="custom-btn delete-btn">刪除</button></td>`;
                    str += `</tr>`;
                });
                str += `</tbody></table>`;
                document.getElementById("content").innerHTML=str;
                
                // 事件處理
                document.getElementById("newPet").onclick = function(){ 
                    // 錯誤4: 函數名稱不匹配！這裡使用的是 showInsertPage，但引入的可能是不同名稱
                    showInsertPage();
                };
                
                const ids = document.getElementsByName("id");
                
                const updateButtons = document.getElementsByName("updatePet");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        // 錯誤5: 沒有檢查 ids[i] 是否存在，如果找不到對應的 id，會導致錯誤
                        showpetUpdatePage(ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deletePet");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        // 錯誤6: 同樣沒有檢查 ids[i] 是否存在
                        doDeletepet(ids[i].innerText);
                    };
                }
                
                break;
            default:
                // 錯誤7: 如果 content 元素不存在，這裡會拋出異常
                document.getElementById("content").innerHTML=response['message'];
                break;
        }
    })
    .catch(err => {
        // 錯誤8: 同上，如果 content 元素不存在，這裡會拋出異常
        document.getElementById("content").innerHTML=err; 
    }) 
}
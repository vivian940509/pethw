import showInsertPage from "./showInsertPage.js";
import showUpdatePage from "./showUpdatePage.js";
import doDelete from "./doDelete.js";
import { BASE_URL } from "./config.js";

export default function userInfo(){
    axios.get(`${BASE_URL}/index.php?action=getUsers`)

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
                          <th class="hide-on-tablet">Email</th>
                          <th class="hide-on-tablet">電話</th>
                          <th class="hide-on-tablet">身分證字號</th>
                          <th style="text-align: center;"><button id='newUser' class="custom-btn">新增使用者</button></th>
                        </tr></thead>
                        <tbody>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td name='id' data-title="編號">` + element['id'] + `</td>`;
                    str += `<td data-title="姓名">` + (element['name'] || '') + `</td>`;
                    str += `<td class="hide-on-tablet" data-title="Email">` + element['email'] + `</td>`;
                    str += `<td class="hide-on-tablet" data-title="電話">` + element['phone'] + `</td>`;
                    str += `<td class="hide-on-tablet" data-title="身分證字號">` + element['id_card'] + `</td>`;
                    str += `<td class="action-column" data-title="操作"><button name='updateUser' class="custom-btn">修改</button>&ensp;<button name='deleteUser' class="custom-btn delete-btn">刪除</button></td>`;
                    str += `</tr>`;
                });
                str += `</tbody></table>`;
                document.getElementById("content").innerHTML=str;
                
                // 其他事件處理部分不變
                document.getElementById("newUser").onclick = function(){ 
                    showInsertPage();
                };
                const ids = document.getElementsByName("id");
                
                const updateButtons = document.getElementsByName("updateUser");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        showUpdatePage(ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deleteUser");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        doDelete(ids[i].innerText);
                    };
                }
                
                break;
            default:
                document.getElementById("content").innerHTML=response['message'];
                break;
        }
    })
    .catch(err => {
        document.getElementById("content").innerHTML=err; 
    }) 
}
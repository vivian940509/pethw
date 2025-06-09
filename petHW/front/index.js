import startPage    from './startPage.js';
import userInfo     from './userInfo.js';
import petInfo     from './petInfo.js';


document.addEventListener('DOMContentLoaded', () => {
  // 1) 渲染按鈕區
  document.getElementById('root').innerHTML = startPage();

  // 2) 綁定事件（此时 #user/#pet_information/#adoption_request 都存在了）
  document.getElementById('user')
          .addEventListener('click', userInfo);

  document.getElementById('pet').addEventListener('click', petInfo);
  //document.getElementById('adoption').addEventListener('click', adoptionInfo);
});
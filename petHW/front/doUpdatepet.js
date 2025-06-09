export default function doUpdatepet(){
    let data = {
         "id": document.getElementById("id").value,
         "name": document.getElementById("name").value,
         "species": document.getElementById("species").value,
         "age": document.getElementById("age").value,
         "description": document.getElementById("description").value,
         "photo": document.getElementById("photo").value,
         "status": document.getElementById("status").value,
         "created_by": document.getElementById("created_by").value
        //這裡不能使用 .innerText  需要使用 .value、因為 <input> 裡面根本沒有 innerText
     };
     
     axios.post("http://localhost/petHW/backend/public/index.php?action=updatepet_information", Qs.stringify(data))
     .then(res => {
         let response = res['data'];
         document.getElementById("content").innerHTML = response['message'];
     })
     .catch(err => {
         document.getElementById("content").innerHTML = err; 
     })
 }
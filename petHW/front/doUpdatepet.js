export default function doUpdatepet(){
    const formData = new FormData();
    formData.append('id', document.getElementById('id').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('species', document.getElementById('species').value);
    formData.append('age', document.getElementById('age').value);
    formData.append('description', document.getElementById('description').value);
    const file = document.getElementById('photo').files[0];
    if (file) {
        formData.append('photo', file);
    } else {
        formData.append('photo', document.getElementById('old_photo').value);
    }
    formData.append('status', document.getElementById('status').value);
    formData.append('created_by', document.getElementById('created_by').value);

     axios.post("http://localhost/petHW/backend/public/index.php?action=updatepet_information", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
     })
     .then(res => {
         let response = res['data'];
         document.getElementById("content").innerHTML = response['message'];
     })
     .catch(err => {
         document.getElementById("content").innerHTML = err; 
     })
 }
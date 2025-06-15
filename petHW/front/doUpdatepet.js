import { BASE_URL } from "./config.js";

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
    }
    formData.append('status', document.getElementById('status').value);
    formData.append('created_by', document.getElementById('created_by').value);
    const oldPhoto = document.getElementById('old_photo').value;
    if (oldPhoto) {
        formData.append('old_photo', oldPhoto);
    }

    axios.post(`${BASE_URL}/index.php?action=updatepet_information`, formData)
        .then(res => {
            let response = res['data'];
            document.getElementById("content").innerHTML = response['message'];
        })
        .catch(err => {
            document.getElementById("content").innerHTML = err;
        })
}

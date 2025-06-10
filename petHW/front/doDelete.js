import { BASE_URL } from "./config.js";

export default function doDelete(id){
    // let idValue;
    // for(let i=0; i<id.length; i++){
    //     if(id[i].checked){
    //         idValue = id[i].value;
    //     }
    // };
    let data = {
        "id": id,
    };
    axios.post(`${BASE_URL}/index.php?action=removeUser`,Qs.stringify(data))
    
    .then(res => {
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err => {
        document.getElementById("content").innerHTML = err;
    })          
}

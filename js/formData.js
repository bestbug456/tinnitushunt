function sendDataForm(id){
    var cap = document.getElementById('cap').value;   
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "insert",
              "cap": cap,
              "id": id},
      success: function(data) {
        alert("Form submitted successfully.\nReturned json: " + data["json"]);
      },
      error: function(xhr,e){
            if(xhr.status==0){
                alert('You are offline!!\n Please Check Your Network.');
            }else if(xhr.status==404){
                alert('Requested URL not found.');
            }else if(xhr.status==500){
                alert('Internel Server Error.');
            }else if(e=='parsererror'){
                alert('Error.\nParsing JSON Request failed.');
            }else if(e=='timeout'){
                alert('Request Time out.');
            }else {
                alert('Unknow Error.\n'+x.responseText);
            }
        }
    });
    return false;
}

function saveAddress(){
  FB.api('/me', function(reply) {
          console.log(reply.id);
          sendDataForm(reply.id)
      });
}

function getPersonalData(){
    FB.api('/me', function(reply) {
          console.log(reply.id);
          getDataForm(reply.id)
      });
}

function getDataForm(id){ 
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "getData",
              "id": id},
      success: function(data) {
        var userData = JSON.parse(data["json"]);
        var formData = userData.dataUser;
        document.getElementById('cap').value = formData.cap;
      },
      error: function(xhr,e){
            if(xhr.status==0){
                alert('You are offline!!\n Please Check Your Network.');
            }else if(xhr.status==404){
                alert('Requested URL not found.');
            }else if(xhr.status==500){
                alert('Internel Server Error.');
            }else if(e=='parsererror'){
                alert('Error.\nParsing JSON Request failed.');
            }else if(e=='timeout'){
                alert('Request Time out.');
            }else {
                alert('Unknow Error.\n'+x.responseText);
            }
        }
    });
    return false;
}
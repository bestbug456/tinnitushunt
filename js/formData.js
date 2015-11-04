function sendDataForm(id,name){
    var email = document.getElementById('email').value;
    var indirizzo = document.getElementById('indirizzo').value;
    var contatto = document.getElementById('contatto').value;
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://tinnitushunt.com/handler.php",
      data: {"action": "insert",
              "id": id,
              "email": email,
              "indirizzo": indirizzo,
              "contatto": contatto
              },
      success: function(data) {
        $('#CloseForm').click();
        $('#Thanks').modal();
        document.getElementById('thanksMessage').innerHTML = "Grazie mille "+name+" per aver inserito i tuoi dati. Il tuo contributo è prezioso aiutaci a diffondere la voce e a sensibilizzare il mondo sul nostro male.";
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
          sendDataForm(reply.id,reply.name);
      });
}

function getPersonalData(){
    FB.api('/me', function(reply) {
          getDataForm(reply.id);
      });
}

function getDataForm(id){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://tinnitushunt.com/handler.php",
      data: {"action": "getData",
              "id": id},
      success: function(data) {
        var userData = JSON.parse(data["json"]);
        var formData = userData.dataUser;
        document.getElementById('email').value = formData.email;
        document.getElementById('indirizzo').value = formData.indirizzo;
        document.getElementById('contatto').value = formData.contatto;
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

function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].value;
}

function setSelectedText(elementId,value) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    elt.value = value;
}

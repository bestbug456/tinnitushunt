function sendDataForm(id,name){
    var cap = document.getElementById('cap').value;
    var senti = getSelectedText('sentiAcufene'); 
    var inizio = '';
    inizio = document.getElementById('inizioAcufene').value;
    var patologie = getSelectedText('patologie');
    var suoni = getSelectedText('suoni');
    var andamento = getSelectedText('andamento');
    var notare = getSelectedText('notare');
    var storia = document.getElementById('storia').value;
    var miglioramento = document.getElementById('miglioramento').value;
    var sesso = document.getElementById('sesso').value;
    var nascita = document.getElementById('anno').value;
    var email = document.getElementById('email').value;
    var indirizzo = document.getElementById('indirizzo').value;

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "insert",
              "id": id,
              "cap": cap,
              "senti": senti,
              "inizio": inizio,
              "patologie": patologie,
              "suoni":suoni,
              "andamento": andamento,
              "notare": notare,
              "storia": storia,
              "miglioramento": miglioramento,
              "sesso": sesso,
              "nascita": nascita,
              "email": email,
              "indirizzo": indirizzo
              },
      success: function(data) {
        $('#CloseForm').click();
        $('#Thanks').modal();
        document.getElementById('thanksMessage').innerHTML = "Grazie mille "+name+" per aver inserito i tuoi dati. Il tuo contributo è prezioso aiutaci a diffondere la voce e a sensibilizzare sul nostro male.";
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
      url: "http://bbug.me/works/acufene/handler.php",
      data: {"action": "getData",
              "id": id},
      success: function(data) {
        var userData = JSON.parse(data["json"]);
        var formData = userData.dataUser;
        document.getElementById('cap').value = formData.cap;
        setSelectedText('sentiAcufene',formData.senti); 
        document.getElementById('inizioAcufene').value = formData.inizio;
        setSelectedText('patologie',formData.patologie);
        setSelectedText('suoni',formData.suoni);
        setSelectedText('andamento',formData.andamento);
        setSelectedText('notare',formData.notare);
        document.getElementById('storia').value = formData.storia;
        document.getElementById('miglioramento').value = formData.miglioramento;
        document.getElementById('sesso').value = formData.sesso;
        document.getElementById('anno').value = formData.nascita;
        document.getElementById('email').value = formData.email;
        document.getElementById('indirizzo').value = formData.indirizzo;
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
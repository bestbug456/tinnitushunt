$('#facebook').click(function(){
	sendAjax("facebook");
});

$('#twitter').click(function(){
	sendAjax("Twitter");
});

function twitterLogin(socialName){
            var self = this;
            self.popupWindow = window.socialPopupWindow = window.open(
                    'http://bbug.me/works/acufene/socialRegisterAndAUthentication.inc.php?provider=Twitter',
                    "hybridauth_social_sing_on",
                    "location=0,status=0,scrollbars=0,width=800,height=500"
                    );
            var winTimer = setInterval(function ()
            {
                if (self.popupWindow.closed !== false)
                {
                    // !== is required for compatibility with Opera
                    clearInterval(winTimer);

                        $.ajax({
						      type: "POST",
						      dataType: "json",
						      url: "http://bbug.me/works/acufene/getSocialData.inc.php",
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


                    /*Now twitter register from
                    require(["http://bbug.me/works/acufene/getSocialData.inc.php"], function (registerModel) {
                        console.log(registerModel);
                        var registerM = new registerModel();                      
                        var ajaxRequest = registerM.socialRegister();
                        $.when(ajaxRequest).done(function (response) {
                            console.log(response);
                            self.slideOutRegister("Twitter");
                            self.twitterObject = response;
                            $('#reg_user').val(response.firstName);
                        });
                        $.when(ajaxRequest).fail(function () {
                            self.slideOutRegister("Email");
                        });
                    });*/
                }
            }, 200);

        
}
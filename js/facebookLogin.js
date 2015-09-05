// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    showForm();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    //document.getElementById('status').innerHTML = 'Please log ' +
    //  'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //document.getElementById('status').innerHTML = 'Please log ' +
    //  'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function openFbPopUp() {
  FB.ui(
    {
      method: 'feed',
      name: 'Tinnitus Hunt',
      link: 'tinnitushunt.com',
      picture: 'http://fbrell.com/f8.jpg',
      caption: '',
      description: 'Quando c’è silenzio senti dei rumori all’interno delle tue orecchie? Soffri di #acufeni? tinnitushunt.com'
    },
    function(response) {
      if (response && response.post_id) {
        alert('Post was published.');
      } else {
        alert('Post was not published.');
      }
    }
  );
}
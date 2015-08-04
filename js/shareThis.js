stLight.options({publisher: "c73dd296-c381-4ec1-91b4-66b8df19bbe7", doNotHash: false, doNotCopy: false, hashAddressBar: false});

var options={ 	"publisher": "c73dd296-c381-4ec1-91b4-66b8df19bbe7", 
				"position": "left", 
				"ad": { "visible": false, "openDelay": 5, "closeDelay": 0}, 
				"chicklets": { "items": [ "twitter","facebook", "linkedin", "googleplus", "email"]},
				"chicklets_params": { 	twitter:{ "st_title":"Quando c’è silenzio senti dei rumori all’interno delle tue orecchie? Soffri di #acufeni?", "st_via":"TinnitusHunt","st_url":"http://www.tinnitushunt.org" }, 
										facebook:{ "og:description":"Quando c’è silenzio senti dei rumori all’interno delle tue orecchie? Soffri di #acufeni?","og:title":"Tinnitus Hunt","og:site_name":"Tinnitus Hunt", "og:url":"http://www.tinnitushunt.org" },
										googleplus:{ "st_summary":"Quando c’è silenzio senti dei rumori all’interno delle tue orecchie? Soffri di #acufeni?", "st_url":"http://www.tinnitushunt.org" }	} };
var st_hover_widget = new sharethis.widgets.hoverbuttons(options);

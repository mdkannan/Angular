import {Injectable} from 'angular2/core';

@Injectable()
export class FacebookService {
	/**
		inititalises 
	**/
	initFB() {
		// whether FB script is loaded or not
		this.fbLoaded = false;
		this.loadFBScript(document, 'script', 'facebook-jssdk');
		let _this = this;
		// Arrow Function to maintaing the service scope to the passed function
		return new Promise(function(resolve, reject){
			window.fbAsyncInit = () => _this.fbStartUp().then(function(response){
				resolve(response);
			},
			function (response) {
				reject(response);
			});
		});
	}
	
	// Loads the FB SDK
	loadFBScript(d, s, id) {
		 // Load the SDK asynchronously
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}
	
	// FB loaded 
	fbStartUp() {
		console.log("FB script loaded dude ");
		FB.init({ 
		  appId: '798941860240743',
		  status: true, 
		  cookie: true, 
		  xfbml: true,
		  version: 'v2.4'
		});
		return new Promise(function(resolve, reject){
			FB.getLoginStatus( function(response){
				if (!response || response.error) {
                    console.log("response is failure "+response);
					reject(response);
                } else {
                    console.log("response is success "+response);
					resolve(response);
                }
			});
		});
		
	}
	
	logintoFacebook () {
		FB.login(null,{
			scope: 'user_photos', 
			return_scopes: true
		});
	}
	
	 getUserDetails(){
            
			return new Promise(function (resolve, reject) {
				FB.api('/me', {
					fields: ['last_name', 'first_name']
				}, function(response) {
					if (!response || response.error) {
						console.log("response is failure "+response);
						reject(response);
						console.log(response);
					} else {
						console.log("response is success "+response);
						resolve(response);
						console.log(response);
					}
				});
			}); 
     }
	 
	 getListofPhotos (albumID) {
		/* make the API call */
		return new Promise(function(resolve, reject){
			FB.api(
			"/"+albumID+"/photos",{
				fields :['height','width','picture']
			},
			function (response) {
			  if (response && !response.error) {
				/* handle the result */
				console.log("response is success "+response);
				resolve(response);
			  }
			  else {
				    console.log("response is failure "+response);
					reject(response);
			  }
			 });
		});
	 }
	 
	 getListofAlbums () {
		/* make the API call */
		return new Promise(function(resolve, reject){
			FB.api(
			"/me/albums",{
				fields :['picture', 'name', 'count', 'type']
			},
			function (response) {
			  if (response && !response.error) {
				/* handle the result */
				resolve(response);
			  }
			  else {
					reject(response);
			  }
			}
			);
		});
		
	 }
	
}



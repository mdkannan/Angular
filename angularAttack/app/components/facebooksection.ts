import {Component} from 'angular2/core';
import {FacebookService} from './../services/fb';

@Component({
	selector: 'facebookSection',
    templateUrl : './app/templates/facebookTemplate.html',
	providers: [FacebookService]
})
export class facebookSection implements OnInit { 
	
	/**
		constructor function by implementing the utitlity services/utility
	**/
	constructor(private _facebookService: FacebookService) {
		this.resetValues();
		this.showLoader("Checking Your FB status. This might take a few seconds depending on ur network.");
	}
	
	/**
		Inititalisation phase of the content class
	**/
	ngOnInit() {
		// load facebook SDK to use the properties of it
		let myPromise = this._facebookService.initFB(),
			_this = this;
		this.setContentWidth();	
		myPromise.then(function (response) {
			_this.authChangeCallback(response);
		},
		function () {
			_this.resetValues();
		});
		
		setTimeout(function () {
			// Check if loader is still available then show the appropriate message.
			let $this = _this;
			$this.hideLoader();
			if($this.fbSDKLoaded) {
				if($this.fbStatus && !$this.appStatus) {
					$this.showErrorMessage("Please signon to application. wih the below Sign on button");
				}
				else if(!$this.fbStatus) {
					$this.showErrorMessage("Please signon to FB and the application. wih the below Sign on button");
				}
			}
			else {
				$this.showErrorMessage("!!!! OOPS You Have Slow / No network Connectivity issues.!!!!");
			}
		}, 10000);
	}
	
	setContentWidth () {
		$("facebooksection .containerRight").width($(window).width() - $("facebooksection .containerLeft").width());
	}
	
	showLoader(msg) {
		this.errorMessage = null;
		this.loaderMessage = msg;
		$("#facebookSection .loader").show();
	}
	
	hideLoader() {
		$("#facebookSection .loader").hide();
	}
	
	resetValues () {
		this.fbSDKLoaded = null;
		this.errorMessage = null;
		this.albumData = [];
		this.fbStatus = null;
		this.appStatus = null;
		this.fbuserName = null;
		this.hideErrorMessage();
		$("#myCollage").hide();
	}
	
	showErrorMessage (msg) {
		this.errorMessage = msg;
		$("facebooksection .errorMessage").show();
	}
	
	hideErrorMessage () {
		$("facebooksection .errorMessage").hide();
	}
	
	authChangeCallback (response) {
		this.fbSDKLoaded = true;
		this.hideLoader();
		console.log("inside authChangeCallback");
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			console.log("logged into facebook");
			console.log(this);
			this.fbStatus = true;
			this.appStatus = true;
			this.getUserDetails();
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			console.log('Please log into this app.');
			this.fbStatus = true;
			this.appStatus = false;
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			this.fbStatus = false;
			this.appStatus = false;
		}
	}
	
	
	/**
	Fetch User Details 
	**/
	getUserDetails () {
		let userPromise = this._facebookService.getUserDetails(),
			_this = this;
		this.showLoader("Fetching User Details ...");	
		userPromise.then(function (response) {
			_this.fbuserName = response.last_name + response.first_name;
			_this.getAlbumsList();
		},
		function (response) {
			_this.showErrorMessage("Could not able to fetch the user Details");
		});
	}
	
	/**
	fetch the album list for the logged in user
	**/
	getAlbumsList () {
		this.showLoader("Fetching your Album Details ...");
		let albumPromise = this._facebookService.getListofAlbums(),
			_this = this;
		albumPromise.then(function(response){
			console.log("retreived Albums");
			console.log(response);
			_this.hideLoader();
			_this.albumData = response.data;
			_this.albumScroller = new IScroll('#fbSrollWrapper', { scrollX: true, scrollY: false, mouseWheel: true });
			setTimeout(function () {
				$("#fbSrollWrapper .scroller").css("width", $("facebookSection .horizontal-slide").width()+"px");
				_this.albumScroller.refresh();
			}, 1000);
			
		}, function(response){
			_this.hideLoader();
			console.log("failed retreiving Albums");
			_this.showErrorMessage("Error while loading Album Data. Please refresh and  try again");
		});
	}

	getAlbumPhotos (albumID) {
		let albumPhotosPromise = this._facebookService.getListofPhotos(albumID),
			_this = this;
		albumPhotosPromise.then(response => _this.loadAlbumPhotos(response), response => _this.errorWhileFetchingPhotos);
	}
	
	loadAlbumPhotos (response) {
	let _this = this;
		$('#modal-content').modal({
			show: true
		});
		this.selectedAlbumPhotos = response.data;
		this.photoScroller = new IScroll('#fbPhotoSrollWrapper', { scrollX: false, scrollY: true, mouseWheel: true });	
		console.log(response);
		setTimeout(function () {
			$("#fbPhotoSrollWrapper .scroller").css("height",($("#fbPhotoSrollWrapper li").length /(Math.floor($(".modal-dialog").width() / 100))) * 120 + "px");
			_this.photoScroller.refresh();
		}, 1000);
	}
	
	errorWhileFetchingPhotos (response) {
		console.log("errorWhileFetchingPhotos");
	}
	
	toggleSelection (domElement) {
		$(domElement).toggleClass("selected");
	}
	
	hideLoaderMsg () {
		$("facebookSection .loaderMessage").hide();
	}
	
	loginToFB() {
		this._facebookService.logintoFacebook();
	}
	
	createCollage () {
		let itemsSelected = $(".album-photos .item").find("img");
		$("#myCollage").html(itemsSelected);
		$("#myCollage").show();
		$("#myCollage").collagePlus();
		console.log(itemsSelected);
	}
}

System.register(['angular2/core', './../services/fb'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, fb_1;
    var facebookSection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (fb_1_1) {
                fb_1 = fb_1_1;
            }],
        execute: function() {
            facebookSection = (function () {
                /**
                    constructor function by implementing the utitlity services/utility
                **/
                function facebookSection(_facebookService) {
                    this._facebookService = _facebookService;
                    this.resetValues();
                    this.showLoader("Checking Your FB status. This might take a few seconds depending on ur network.");
                }
                /**
                    Inititalisation phase of the content class
                **/
                facebookSection.prototype.ngOnInit = function () {
                    // load facebook SDK to use the properties of it
                    var myPromise = this._facebookService.initFB(), _this = this;
                    this.setContentWidth();
                    myPromise.then(function (response) {
                        _this.authChangeCallback(response);
                    }, function () {
                        _this.resetValues();
                    });
                    setTimeout(function () {
                        // Check if loader is still available then show the appropriate message.
                        var $this = _this;
                        $this.hideLoader();
                        if ($this.fbSDKLoaded) {
                            if ($this.fbStatus && !$this.appStatus) {
                                $this.showErrorMessage("Please signon to application. wih the below Sign on button");
                            }
                            else if (!$this.fbStatus) {
                                $this.showErrorMessage("Please signon to FB and the application. wih the below Sign on button");
                            }
                        }
                        else {
                            $this.showErrorMessage("!!!! OOPS You Have Slow / No network Connectivity issues.!!!!");
                        }
                    }, 10000);
                };
                facebookSection.prototype.setContentWidth = function () {
                    $("facebooksection .containerRight").width($(window).width() - $("facebooksection .containerLeft").width());
                };
                facebookSection.prototype.showLoader = function (msg) {
                    this.errorMessage = null;
                    this.loaderMessage = msg;
                    $("#facebookSection .loader").show();
                };
                facebookSection.prototype.hideLoader = function () {
                    $("#facebookSection .loader").hide();
                };
                facebookSection.prototype.resetValues = function () {
                    this.fbSDKLoaded = null;
                    this.errorMessage = null;
                    this.albumData = [];
                    this.fbStatus = null;
                    this.appStatus = null;
                    this.fbuserName = null;
                    this.hideErrorMessage();
                    $("#myCollage").hide();
                };
                facebookSection.prototype.showErrorMessage = function (msg) {
                    this.errorMessage = msg;
                    $("facebooksection .errorMessage").show();
                };
                facebookSection.prototype.hideErrorMessage = function () {
                    $("facebooksection .errorMessage").hide();
                };
                facebookSection.prototype.authChangeCallback = function (response) {
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
                    }
                    else if (response.status === 'not_authorized') {
                        // The person is logged into Facebook, but not your app.
                        console.log('Please log into this app.');
                        this.fbStatus = true;
                        this.appStatus = false;
                    }
                    else {
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                        this.fbStatus = false;
                        this.appStatus = false;
                    }
                };
                /**
                Fetch User Details
                **/
                facebookSection.prototype.getUserDetails = function () {
                    var userPromise = this._facebookService.getUserDetails(), _this = this;
                    this.showLoader("Fetching User Details ...");
                    userPromise.then(function (response) {
                        _this.fbuserName = response.last_name + response.first_name;
                        _this.getAlbumsList();
                    }, function (response) {
                        _this.showErrorMessage("Could not able to fetch the user Details");
                    });
                };
                /**
                fetch the album list for the logged in user
                **/
                facebookSection.prototype.getAlbumsList = function () {
                    this.showLoader("Fetching your Album Details ...");
                    var albumPromise = this._facebookService.getListofAlbums(), _this = this;
                    albumPromise.then(function (response) {
                        console.log("retreived Albums");
                        console.log(response);
                        _this.hideLoader();
                        _this.albumData = response.data;
                        _this.albumScroller = new IScroll('#fbSrollWrapper', { scrollX: true, scrollY: false, mouseWheel: true });
                        setTimeout(function () {
                            $("#fbSrollWrapper .scroller").css("width", $("facebookSection .horizontal-slide").width() + "px");
                            _this.albumScroller.refresh();
                        }, 1000);
                    }, function (response) {
                        _this.hideLoader();
                        console.log("failed retreiving Albums");
                        _this.showErrorMessage("Error while loading Album Data. Please refresh and  try again");
                    });
                };
                facebookSection.prototype.getAlbumPhotos = function (albumID) {
                    var albumPhotosPromise = this._facebookService.getListofPhotos(albumID), _this = this;
                    albumPhotosPromise.then(function (response) { return _this.loadAlbumPhotos(response); }, function (response) { return _this.errorWhileFetchingPhotos; });
                };
                facebookSection.prototype.loadAlbumPhotos = function (response) {
                    var _this = this;
                    $('#modal-content').modal({
                        show: true
                    });
                    this.selectedAlbumPhotos = response.data;
                    this.photoScroller = new IScroll('#fbPhotoSrollWrapper', { scrollX: false, scrollY: true, mouseWheel: true });
                    console.log(response);
                    setTimeout(function () {
                        $("#fbPhotoSrollWrapper .scroller").css("height", ($("#fbPhotoSrollWrapper li").length / (Math.floor($(".modal-dialog").width() / 100))) * 120 + "px");
                        _this.photoScroller.refresh();
                    }, 1000);
                };
                facebookSection.prototype.errorWhileFetchingPhotos = function (response) {
                    console.log("errorWhileFetchingPhotos");
                };
                facebookSection.prototype.toggleSelection = function (domElement) {
                    $(domElement).toggleClass("selected");
                };
                facebookSection.prototype.hideLoaderMsg = function () {
                    $("facebookSection .loaderMessage").hide();
                };
                facebookSection.prototype.loginToFB = function () {
                    this._facebookService.logintoFacebook();
                };
                facebookSection.prototype.createCollage = function () {
                    var itemsSelected = $(".album-photos .item").find("img");
                    $("#myCollage").html(itemsSelected);
                    $("#myCollage").show();
                    $("#myCollage").collagePlus();
                    console.log(itemsSelected);
                };
                facebookSection = __decorate([
                    core_1.Component({
                        selector: 'facebookSection',
                        templateUrl: './app/templates/facebookTemplate.html',
                        providers: [fb_1.FacebookService]
                    }), 
                    __metadata('design:paramtypes', [fb_1.FacebookService])
                ], facebookSection);
                return facebookSection;
            }());
            exports_1("facebookSection", facebookSection);
        }
    }
});

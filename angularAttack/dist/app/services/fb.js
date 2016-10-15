System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var FacebookService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FacebookService = (function () {
                function FacebookService() {
                }
                /**
                    inititalises
                **/
                FacebookService.prototype.initFB = function () {
                    // whether FB script is loaded or not
                    this.fbLoaded = false;
                    this.loadFBScript(document, 'script', 'facebook-jssdk');
                    var _this = this;
                    // Arrow Function to maintaing the service scope to the passed function
                    return new Promise(function (resolve, reject) {
                        window.fbAsyncInit = function () { return _this.fbStartUp().then(function (response) {
                            resolve(response);
                        }, function (response) {
                            reject(response);
                        }); };
                    });
                };
                // Loads the FB SDK
                FacebookService.prototype.loadFBScript = function (d, s, id) {
                    // Load the SDK asynchronously
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id))
                        return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                };
                // FB loaded 
                FacebookService.prototype.fbStartUp = function () {
                    console.log("FB script loaded dude ");
                    FB.init({
                        appId: '798941860240743',
                        status: true,
                        cookie: true,
                        xfbml: true,
                        version: 'v2.4'
                    });
                    return new Promise(function (resolve, reject) {
                        FB.getLoginStatus(function (response) {
                            if (!response || response.error) {
                                console.log("response is failure " + response);
                                reject(response);
                            }
                            else {
                                console.log("response is success " + response);
                                resolve(response);
                            }
                        });
                    });
                };
                FacebookService.prototype.logintoFacebook = function () {
                    FB.login(null, {
                        scope: 'user_photos',
                        return_scopes: true
                    });
                };
                FacebookService.prototype.getUserDetails = function () {
                    return new Promise(function (resolve, reject) {
                        FB.api('/me', {
                            fields: ['last_name', 'first_name']
                        }, function (response) {
                            if (!response || response.error) {
                                console.log("response is failure " + response);
                                reject(response);
                                console.log(response);
                            }
                            else {
                                console.log("response is success " + response);
                                resolve(response);
                                console.log(response);
                            }
                        });
                    });
                };
                FacebookService.prototype.getListofPhotos = function (albumID) {
                    /* make the API call */
                    return new Promise(function (resolve, reject) {
                        FB.api("/" + albumID + "/photos", {
                            fields: ['height', 'width', 'picture']
                        }, function (response) {
                            if (response && !response.error) {
                                /* handle the result */
                                console.log("response is success " + response);
                                resolve(response);
                            }
                            else {
                                console.log("response is failure " + response);
                                reject(response);
                            }
                        });
                    });
                };
                FacebookService.prototype.getListofAlbums = function () {
                    /* make the API call */
                    return new Promise(function (resolve, reject) {
                        FB.api("/me/albums", {
                            fields: ['picture', 'name', 'count', 'type']
                        }, function (response) {
                            if (response && !response.error) {
                                /* handle the result */
                                resolve(response);
                            }
                            else {
                                reject(response);
                            }
                        });
                    });
                };
                FacebookService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FacebookService);
                return FacebookService;
            }());
            exports_1("FacebookService", FacebookService);
        }
    }
});

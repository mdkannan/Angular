System.register(['angular2/core', './../services/utility', './facebooksection'], function(exports_1, context_1) {
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
    var core_1, utility_1, facebooksection_1;
    var Content;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (facebooksection_1_1) {
                facebooksection_1 = facebooksection_1_1;
            }],
        execute: function() {
            Content = (function () {
                /**
                    constructor function by implementing the utitlity services/utility
                **/
                function Content(_utilityService) {
                    this._utilityService = _utilityService;
                }
                /**
                    Inititalisation phase of the content class
                **/
                Content.prototype.ngOnInit = function () {
                    this.setContentHeight();
                };
                Content.prototype.setContentHeight = function () {
                    this._utilityService.setContentHeight($("content"));
                };
                Content = __decorate([
                    core_1.Component({
                        selector: 'Content',
                        templateUrl: './app/templates/contentTemplate.html',
                        providers: [utility_1.UtilityService],
                        directives: [facebooksection_1.facebookSection]
                    }), 
                    __metadata('design:paramtypes', [utility_1.UtilityService])
                ], Content);
                return Content;
            }());
            exports_1("Content", Content);
        }
    }
});

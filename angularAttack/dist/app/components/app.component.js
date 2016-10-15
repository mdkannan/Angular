System.register(['angular2/core', './header', './content', './footer'], function(exports_1, context_1) {
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
    var core_1, header_1, content_1, footer_1;
    var PhotoCollage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (content_1_1) {
                content_1 = content_1_1;
            },
            function (footer_1_1) {
                footer_1 = footer_1_1;
            }],
        execute: function() {
            PhotoCollage = (function () {
                function PhotoCollage() {
                }
                /**
                    Inititalisation phase of the content class
                **/
                PhotoCollage.prototype.ngOnInit = function () {
                };
                PhotoCollage = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: '<Header></Header><Content></Content><Footer></Footer>',
                        styleUrls: ['styles/app.css'],
                        directives: [header_1.Header, content_1.Content, footer_1.Footer],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], PhotoCollage);
                return PhotoCollage;
            }());
            exports_1("PhotoCollage", PhotoCollage);
        }
    }
});

import {Component} from 'angular2/core';
import {UtilityService} from './../services/utility';
import {facebookSection} from './facebooksection'

@Component({
	selector: 'Content',
    templateUrl : './app/templates/contentTemplate.html',
	providers: [UtilityService],
	directives : [facebookSection]
	
})
export class Content implements OnInit { 
	
	/**
		constructor function by implementing the utitlity services/utility
	**/
	constructor(private _utilityService: UtilityService) { }
	
	/**
		Inititalisation phase of the content class
	**/
	ngOnInit() {
		this.setContentHeight();
	}
	
	setContentHeight () {
		this._utilityService.setContentHeight($("content"));
	}
	
}

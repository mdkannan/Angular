import {Component, Input, DynamicComponentLoader, ElementRef} from 'angular2/core';


@Component({
	selector: 'FlexContainer',
	templateUrl: './app/templates/flexContainer.html'
})

export class FlexContainer {
	@Input() leftContainerText:string; 
	@Input() rightContainerTemplateUrl:string;
	
}


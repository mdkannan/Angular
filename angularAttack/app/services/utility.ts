import {Injectable} from 'angular2/core';

@Injectable()
export class UtilityService {
	
	// sets the Content Height based in the Header and Footer Heights
	setContentHeight(contentDOM) {
		var headerHeight = jQuery("header").height(),
			footerHeight = jQuery("footer").height(),
			windowHeight = jQuery(window).height();
		contentDOM.css("height", (windowHeight - (headerHeight + footerHeight)));		
	}
}

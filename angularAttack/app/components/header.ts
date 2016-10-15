import {Component} from 'angular2/core';

@Component({
	selector: 'Header',
    template : 'Header with title gkj {{title}}'
})
export class Header { 
	title = 'myHeader';
}

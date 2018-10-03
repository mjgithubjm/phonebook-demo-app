import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(): boolean {
		return false;
	}
}

@Component({
	selector: 'app-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
	@Input() name: string = "";

	@Input() isRequired: boolean = false;

	@Input() hint: string = "";

	@Input() label: string = "";

	@Input() placeholder: string = "";

	@Input() disabled: boolean = false;

	@Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

	errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

	constructor() { }

	ngOnInit() {
	}

	getMessagesFor(elementName: string) {
		return null;
	}

	onBlur(event: any): void {

	}

	onFocus(event: any): void {

	}

	onKeyUp(): void {
		this.nameChange.emit(this.name);
	}
}

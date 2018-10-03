import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ConfirmationService {
	confirmationRequestEvent: EventEmitter<any> = new EventEmitter<any>();
	confirm(options: any): void {
		this.confirmationRequestEvent.emit(options);
	}
}
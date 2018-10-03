import { Injectable, EventEmitter } from "@angular/core";

/**
 * Service that emits messages that need to trigger the pop-up window.
 * Message can be a warning or a confirmation request
 */
@Injectable()
export class MessageService {
	messageRequestEvent: EventEmitter<any> = new EventEmitter<any>();

	add(messageOptions: any): void {
		this.messageRequestEvent.emit(messageOptions);
	}
}
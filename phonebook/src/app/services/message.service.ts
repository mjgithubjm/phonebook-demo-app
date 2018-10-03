import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class MessageService {
	messageRequestEvent: EventEmitter<any> = new EventEmitter<any>();

	add(messageOptions: any) {
		this.messageRequestEvent.emit(messageOptions);
	}
}
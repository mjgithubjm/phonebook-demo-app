import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';

@Component({
	selector: 'app-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
	newContact: Contact = new Contact();

	constructor(private contactsService: ContactService, private messageService: MessageService) { }

	ngOnInit() {
	}

	addContact() {
		if (this.newContact.firstName && this.newContact.phoneNumber) this.contactsService.addContact(this.newContact).then(() => { console.log("finished");})
		else {
			this.messageService.add({ message: "Please fill in new name and phone number" , category: "warning"});
		}
	}
}

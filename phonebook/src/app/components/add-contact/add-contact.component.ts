import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
	newContact: Contact = new Contact();

	constructor(private contactsService: ContactService, private router: Router, private messageService: MessageService) { }

	ngOnInit() {
	}

	addContact() {
		if (this.newContact.firstName && this.newContact.phoneNumber) {
			this.contactsService.addContact(this.newContact).then(() => {
				this.router.navigate(["all-contacts"])
			})
		}
		else {
			this.messageService.add({ message: "Please fill in new name and phone number" , category: "warning"});
		}
	}
}

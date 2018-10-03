import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';

/**
 * Page for adding a new contact
 */
@Component({
	selector: 'app-add-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
	newContact: Contact = new Contact();

	constructor(private contactsService: ContactService, private router: Router, 
		private messageService: MessageService) { }

	ngOnInit(): void {
	}

	addContact(): void {
		if (this.newContact.firstName && this.newContact.phoneNumber) {
			this.contactsService.addContact(this.newContact).then(() => {
				this.router.navigate(["all-contacts"]);
			})
		}
		else {
			this.messageService.add({ message: "Please fill in first name and phone number" , category: "warning"});
		}
	}
}

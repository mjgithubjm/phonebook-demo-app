import { Component, OnInit } from '@angular/core';
import { faEdit, faInfo, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';

/**
 * Start page
 */
@Component({
	selector: 'app-all-contacts',
	templateUrl: './all-contacts.component.html',
	styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
	name: string = "";

	get contacts(): Array<Contact> { return this.contactsService.findContact(this.name); }

	iconEdit = faEdit;

	iconInfo = faInfo;

	iconDelete = faTrash;

	iconAdd = faPlus;

	constructor(private contactsService: ContactService, private router: Router,
		private messageService: MessageService) {

	}

	ngOnInit(): void {
		this.contactsService.setContacts();
	}

	editContact(contactId: number): void {
		this.router.navigate(["edit-contact", contactId]);
	}

	deleteContact(contactId: number): void {
		this.messageService.add({
			message: "Are you sure you want to delete this contact?",
			category: "request",
			acceptFunction: (() => { this.delete(contactId); }),
			rejectFunction: (() => { })
		});
	}

	private delete(contactId: number): void {
		this.contactsService.deleteContact(contactId);
	}

	viewContact(contactId: number): void {
		this.router.navigate(["contact-details", contactId]);
	}

	addContact(): void {
		this.router.navigate(["add-contact"]);
	}
}

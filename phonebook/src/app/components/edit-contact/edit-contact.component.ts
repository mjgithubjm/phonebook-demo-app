import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../model/contact';
import { MessageService } from '../../services/message.service';

@Component({
	selector: 'app-edit-contact',
	templateUrl: './edit-contact.component.html',
	styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
	id: number;
	selectedContact: Contact;

	constructor(private contactsService: ContactService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

	ngOnInit() {
		this.route.params.subscribe(async (params: Params) => {
			this.id = params['id'];

			this.selectedContact = await this.contactsService.getContact(this.id);

		});
	}

	editContact() {
		this.messageService.add({
			message: "Do you want to save your changes?",
			category: "request",
			acceptFunction: (() => { this.edit(); }),
			rejectFunction: (() => { })
		});
	}

	edit() {
		this.contactsService.editContact(this.selectedContact).then(() => {
			this.router.navigate(["all-contacts"]);
		});
	}

}

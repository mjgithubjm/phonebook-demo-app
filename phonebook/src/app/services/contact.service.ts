import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Contact } from "../model/contact";

@Injectable()
export class ContactService {
	contacts: Array<Contact>;

	baseUrl: string = 'http://localhost:8000/phonebook-api';

	saveUrlPath: string = 'save-contact-changes';

	constructor(private http: HttpClient) {
	}

	async getContact(id: number) {
		let result: any = await this.getContacts();
		if (result.success) this.contacts = result.data;
		if (this.contacts) return this.contacts.find((contact) => { return contact.id == id; });
		else return null;
	}

	getContacts() {
		return this.http.get('http://localhost:8000/phonebook-api/all-contacts').toPromise();
	}

	setContacts() {
		this.http.get('http://localhost:8000/phonebook-api/all-contacts').subscribe((result: any) => {
			console.log(result)
			if(result.success) this.contacts = result.data;
		});
	}

	findContact(name: string): Contact[] {
		if (name === "" || name === null) return this.contacts;

		let searchTerms = name.toLowerCase().replace(/  +/g, ' ').split(" ");

		return this.contacts.filter((contact) => {
			let matchCount = 0;

			searchTerms.forEach((subterm) => {
				if (contact.firstName.toLowerCase().includes(subterm) || contact.lastName.toLowerCase().includes(subterm)) matchCount++;
			});

			if (matchCount === searchTerms.length) return true;
			else return false;
		});
	}

	async addContact(newContact: Contact) {
		if (!this.contacts) this.contacts = new Array<Contact>();
		this.contacts.push(newContact);
		this.http.post(this.baseUrl + '/' + this.saveUrlPath, this.contacts).subscribe((result: any) => {
		});
	}

	async editContact(editedContact: Contact) {
		let foundContact = this.contacts.find((contact) => contact.id === editedContact.id);
		if (foundContact) {
			foundContact.firstName = editedContact.firstName;
			foundContact.lastName = editedContact.lastName;
			foundContact.phoneNumber = editedContact.phoneNumber;

			this.http.post(this.baseUrl + '/' + this.saveUrlPath, this.contacts).subscribe((result: any) => {
			});
		}
	}

	async deleteContact(id: number) {
		if (!this.contacts) return;

		let index = this.contacts.findIndex((contact) => contact.id === id);

		if (index !== -1) {
			this.contacts.splice(index, 1);
			this.http.post(this.baseUrl + '/' + this.saveUrlPath, this.contacts).subscribe((result: any) => {
			});
		}
	}
}
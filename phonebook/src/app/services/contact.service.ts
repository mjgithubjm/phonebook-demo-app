import { Contact } from "../model/contact";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
	contacts: Array<Contact>;

	constructor(private http: HttpClient) {
	}

	async getContact(id: number) {
		this.contacts = await this.getContacts();
		if (this.contacts) return this.contacts.find((contact) => { return contact.id == id; });
		else return null;
	}

	getContacts() {
		return this.http.get("./assets/contacts.json").pipe(map(res => <Contact[]>res)).toPromise();
	}

	setContacts() {
		this.http.get("./assets/contacts.json").subscribe((results: any) => {
			this.contacts = results;
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
		this.contacts = await this.getContacts();
		if (!this.contacts) this.contacts = new Array<Contact>();
		newContact.id = this.contacts.length;
		this.contacts.push(newContact);
	}

	editContact(contact: Contact) {
		let foundContact = this.contacts.find((contact) => contact.id === contact.id);
		if (foundContact) {
			foundContact.firstName = contact.firstName;
			foundContact.lastName = contact.lastName;
			foundContact.phoneNumber = contact.phoneNumber;
		}
	}

	async deleteContact(id: number) {
		if (!this.contacts) this.contacts = await this.getContacts();
		let index = this.contacts.findIndex((contact) => contact.id === contact.id);

		if (index !== -1) {
			this.contacts = this.contacts.splice(index, 1);
		}
	}
}
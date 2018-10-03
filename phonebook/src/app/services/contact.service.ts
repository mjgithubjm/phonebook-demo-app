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

    getAllContacts() {
        return this.http.get("./assets/contacts.json");
    }

    setContacts() {
        this.http.get("./assets/contacts.json").subscribe((results: any) => {
            this.contacts = results;
        });
    }

    async findContact(name: string) {
        return this.contacts.find((contact) => {
            return contact.firstName.includes(name) || contact.lastName.includes(name);
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
            console.log(this.contacts);
            console.log(foundContact)
        }
    }

    deleteContact(id: number) {

    }
}